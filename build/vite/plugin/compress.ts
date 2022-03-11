/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * https://github.com/anncwb/vite-plugin-compression
 */
import type { Plugin } from "vite";
import viteCompression from "vite-plugin-compression";

type Algorithm = "gzip" | "brotliCompress" | "deflate" | "deflateRaw";

export function configCompressPlugin(algorithm?: Algorithm, disable?: boolean): Plugin {
  return viteCompression({
    verbose: true,
    disable: disable || false,
    threshold: 10240,
    algorithm: algorithm || "gzip",
    ext: ".gz",
  });
}
