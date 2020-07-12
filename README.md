# qy-mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and Fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目主要文件结构
├─public
└─src
    ├─assets             放静态资源 css/img       
    ├─common             放公共的js文件 比如项目中经常用到的常量/公共方法
    ├─components
    │  ├─common          放完全封装的组件 需要时可以直接用到其他项目里
    │  │  
    │  └─content         放和项目业务相关的组件
    │      
    ├─router             vuejs路由
    └─views              放项目中主要视图文件/组件
