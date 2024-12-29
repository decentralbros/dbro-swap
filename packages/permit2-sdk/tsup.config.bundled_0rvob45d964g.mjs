// tsup.config.ts
import { exec } from "child_process";
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig((options) => ({
  entry: {
    index: "./src/index.ts"
  },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUvdmluY2VudC9Eb2N1bWVudHMvd29ya3NwYWNlL2Ricm8vc3dhcC9kYnJvL3BhY2thZ2VzL3Blcm1pdDItc2RrL3RzdXAuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9ob21lL3ZpbmNlbnQvRG9jdW1lbnRzL3dvcmtzcGFjZS9kYnJvL3N3YXAvZGJyby9wYWNrYWdlcy9wZXJtaXQyLXNka1wiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vaG9tZS92aW5jZW50L0RvY3VtZW50cy93b3Jrc3BhY2UvZGJyby9zd2FwL2Ricm8vcGFja2FnZXMvcGVybWl0Mi1zZGsvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2VzcydcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygob3B0aW9ucykgPT4gKHtcbiAgZW50cnk6IHtcbiAgICBpbmRleDogJy4vc3JjL2luZGV4LnRzJyxcbiAgfSxcbiAgZm9ybWF0OiBbJ2VzbScsICdjanMnXSxcbiAgZHRzOiBmYWxzZSxcbiAgY2xlYW46ICFvcHRpb25zLndhdGNoLFxuICB0cmVlc2hha2U6IHRydWUsXG4gIHNwbGl0dGluZzogdHJ1ZSxcbiAgb25TdWNjZXNzOiBhc3luYyAoKSA9PiB7XG4gICAgZXhlYygndHNjIC0tZW1pdERlY2xhcmF0aW9uT25seSAtLWRlY2xhcmF0aW9uJywgKGVyciwgc3Rkb3V0KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3Ioc3Rkb3V0KVxuICAgICAgICBpZiAoIW9wdGlvbnMud2F0Y2gpIHtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG59KSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsU0FBUyxZQUFZO0FBQ2xYLFNBQVMsb0JBQW9CO0FBRTdCLElBQU8sc0JBQVEsYUFBYSxDQUFDLGFBQWE7QUFBQSxFQUN4QyxPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQ3JCLEtBQUs7QUFBQSxFQUNMLE9BQU8sQ0FBQyxRQUFRO0FBQUEsRUFDaEIsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsV0FBVyxZQUFZO0FBQ3JCLFNBQUssMkNBQTJDLENBQUMsS0FBSyxXQUFXO0FBQy9ELFVBQUksS0FBSztBQUNQLGdCQUFRLE1BQU0sTUFBTTtBQUNwQixZQUFJLENBQUMsUUFBUSxPQUFPO0FBQ2xCLGtCQUFRLEtBQUssQ0FBQztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
