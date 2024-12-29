// tsup.config.ts
import { defineConfig } from "tsup";
import { exec } from "child_process";
var tsup_config_default = defineConfig((options) => ({
  entry: {
    index: "./src/index.ts"
  },
  sourcemap: true,
  skipNodeModulesBundle: true,
  format: ["esm", "cjs"],
  dts: false,
  clean: !options.watch,
  treeshake: true,
  splitting: true,
  onSuccess: async () => {
    exec("tsc --emitDeclarationOnly --declaration", (err, stdout) => {
      if (err) {
        console.error(stdout);
        if (!options.watch) {
          process.exit(1);
        }
      }
    });
  }
}));
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUvdmluY2VudC9Eb2N1bWVudHMvd29ya3NwYWNlL2Ricm8vc3dhcC9kYnJvL3BhY2thZ2VzL3N3YXAtc2RrLWV2bS90c3VwLmNvbmZpZy50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvaG9tZS92aW5jZW50L0RvY3VtZW50cy93b3Jrc3BhY2UvZGJyby9zd2FwL2Ricm8vcGFja2FnZXMvc3dhcC1zZGstZXZtXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9ob21lL3ZpbmNlbnQvRG9jdW1lbnRzL3dvcmtzcGFjZS9kYnJvL3N3YXAvZGJyby9wYWNrYWdlcy9zd2FwLXNkay1ldm0vdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd0c3VwJ1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygob3B0aW9ucykgPT4gKHtcbiAgZW50cnk6IHtcbiAgICBpbmRleDogJy4vc3JjL2luZGV4LnRzJyxcbiAgfSxcbiAgc291cmNlbWFwOiB0cnVlLFxuICBza2lwTm9kZU1vZHVsZXNCdW5kbGU6IHRydWUsXG4gIGZvcm1hdDogWydlc20nLCAnY2pzJ10sXG4gIGR0czogZmFsc2UsXG4gIGNsZWFuOiAhb3B0aW9ucy53YXRjaCxcbiAgdHJlZXNoYWtlOiB0cnVlLFxuICBzcGxpdHRpbmc6IHRydWUsXG4gIG9uU3VjY2VzczogYXN5bmMgKCkgPT4ge1xuICAgIGV4ZWMoJ3RzYyAtLWVtaXREZWNsYXJhdGlvbk9ubHkgLS1kZWNsYXJhdGlvbicsIChlcnIsIHN0ZG91dCkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKHN0ZG91dClcbiAgICAgICAgaWYgKCFvcHRpb25zLndhdGNoKSB7XG4gICAgICAgICAgcHJvY2Vzcy5leGl0KDEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxufSkpXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdXLFNBQVMsb0JBQW9CO0FBQzdYLFNBQVMsWUFBWTtBQUVyQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxhQUFhO0FBQUEsRUFDeEMsT0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLHVCQUF1QjtBQUFBLEVBQ3ZCLFFBQVEsQ0FBQyxPQUFPLEtBQUs7QUFBQSxFQUNyQixLQUFLO0FBQUEsRUFDTCxPQUFPLENBQUMsUUFBUTtBQUFBLEVBQ2hCLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFdBQVcsWUFBWTtBQUNyQixTQUFLLDJDQUEyQyxDQUFDLEtBQUssV0FBVztBQUMvRCxVQUFJLEtBQUs7QUFDUCxnQkFBUSxNQUFNLE1BQU07QUFDcEIsWUFBSSxDQUFDLFFBQVEsT0FBTztBQUNsQixrQkFBUSxLQUFLLENBQUM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
