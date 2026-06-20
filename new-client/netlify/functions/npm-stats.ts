export default async (req: Request) => {
    const url = new URL(req.url);

    type NpmDownloadStat = {
      downloads: number;
      start: string;
      end: string;
      package: string;
    };

  const packageName = url.searchParams.get("package");

  if (!packageName) {
    return Response.json(
      { error: "Missing package parameter" },
      { status: 400 },
    );
  }

  const res = await fetch(
    `https://api.npmjs.org/downloads/point/last-year/${encodeURIComponent(packageName)}`,
  );

  if (!res.ok) {
    return Response.json(
      { error: "Failed to fetch stats" },
      { status: res.status },
    );
  }

  const stat: NpmDownloadStat = await res.json();

  return Response.json(stat, {
    headers: {
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
};
