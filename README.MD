# Dreamer
> Dont't let your dreams jus be dreams

lycpan233 个人博客，本项目基于 [vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing) 实现，相关技术细节可以参考该项目。

# 部署失败设置
在 scripts 中根据系统设置不同的环境变量
Linux & Mac OS：
```
  "build": "export NODE_OPTIONS=--openssl-legacy-provider && node --max_old_space_size=4096 ./node_modules/vuepress/cli.js build docs",
```

Windows:
```
  "build": "set NODE_OPTIONS=--openssl-legacy-provider && node --max_old_space_size=4096 ./node_modules/vuepress/cli.js build docs",
```