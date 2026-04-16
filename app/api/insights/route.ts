import { NextResponse } from "next/server";

const SHEET_ID = "1D7SKY65vSpByhyO9UimUHtDIAul9996qTUPUJqmuehI";

/* Try multiple Google Sheets export URLs in order */
const SHEET_URLS = [
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`,
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`,
];

function parseCSV(text: string): string[][] {
    const rows: string[][] = [];
    let current = "";
    let inQuotes = false;
    let row: string[] = [];

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"') {
            if (inQuotes && text[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            row.push(current.trim());
            current = "";
        } else if ((char === "\n" || char === "\r") && !inQuotes) {
            if (current || row.length > 0) {
                row.push(current.trim());
                rows.push(row);
                row = [];
                current = "";
            }
            if (char === "\r" && text[i + 1] === "\n") i++;
        } else {
            current += char;
        }
    }
    if (current || row.length > 0) {
        row.push(current.trim());
        rows.push(row);
    }
    return rows;
}

export async function GET() {
    let lastError = "";

    for (const url of SHEET_URLS) {
        try {
            const res = await fetch(url, {
                cache: "no-store",
                headers: { "User-Agent": "Mozilla/5.0" },
            });

            if (!res.ok) {
                lastError = `HTTP ${res.status} from ${url}`;
                continue;
            }

            const text = await res.text();

            // Guard: if Google returned an HTML page (login redirect), skip
            if (text.trimStart().startsWith("<")) {
                lastError = `Received HTML instead of CSV from ${url} — sheet may not be public`;
                continue;
            }

            const rows = parseCSV(text);

            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                let url = "";
                let title = "";

                // Check if Column B (1) has the URL
                if (row.length > 1 && row[1] && row[1].includes("linkedin.com")) {
                    url = row[1];
                    title = row[2] || ""; // Assume Column C is Title
                }
                // Check if Column C (2) has the URL
                else if (row.length > 2 && row[2] && row[2].includes("linkedin.com")) {
                    url = row[2];
                    title = row[1] || ""; // Assume Column B is Title
                }

                if (url) {
                    posts.push({
                        number: row[0] || String(i),
                        title: title.trim(),
                        url: url.trim(),
                    });
                }
            }

            return NextResponse.json({ posts, source: url });
        } catch (err) {
            lastError = String(err);
        }
    }

    return NextResponse.json(
        { error: `Could not load sheet: ${lastError}`, posts: [] },
        { status: 500 }
    );
}
