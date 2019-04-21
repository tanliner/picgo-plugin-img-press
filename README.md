## picgo-plugin-img-press

This is an GUI picgo-plugin, to compression `png` image for github, [tinypng](https://github.com/tanliner/tinypng) script you should install first

the [PicGo-Core](https://github.com/PicGo/PicGo-Core) and GUI project [PicGo](https://github.com/Molunerfinn/PicGo/), [PicGoApi](https://picgo.github.io/PicGo-Core-Doc/zh/api/)

Usually, `PicGo` is a global lib
```
npm install picgo -g

congfig file of picgo-core: ~/.picgo/config.json
config file of [PicGo] application: ~/Library/Application Support/picgo/data.json

// https://picgo.github.io/PicGo-Core-Doc/zh/dev-guide/deploy.html#%E6%99%AE%E9%80%9A%E6%8F%92%E4%BB%B6

```

Use PicGo plugin template to build a npm project [picgo-template-plugin](https://picgo.github.io/PicGo-Core-Doc/zh/dev-guide/cli.html#%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6%E6%A8%A1%E6%9D%BF)

```
// picgo-plugin must be the prefix
mkdir picgo-plugin-project-name
picgo init plugin picgo-plugin-project-name
```

### Install into picgo

main-step
```
cd ~/Library/Application Support/picgo/
npm install path/to/you/project
```
every time you update the plugin, you should run the main-step, and restart the `PicGo` App by right click the icon

### To check it running well
you should use the ctx log
If you want check some variable is right, `console.log('TAG', 'some debug information...')`, I'm sorry to tell you that
you will get noting on the console window. Please use `ctx.log.info` instead, now, to check the log...

```
cd ~/Library/Application Support/picgo/
tail -f picgo.log

``` 
when you built done, the PicGo will figure out
![](https://raw.githubusercontent.com/tanliner/picgo-plugin-img-press/master/img/plugin-overview-compressed.png)
