import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "marafet-studio";

const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
  env: {
    // next/image renders a plain <img> when unoptimized, so it does not
    // auto-prefix local /public sources with basePath — components must
    // do it themselves via this build-time constant.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
