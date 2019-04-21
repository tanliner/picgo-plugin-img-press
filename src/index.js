const {spawnSync} = require('child_process')

/**
 * will exec tinypng compression shell
 * @param ctx
 * @param files upload file
 * @returns {Array}
 */
async function compressFile (ctx, files) {
  const compressedFiles = []
  if (files instanceof Array) {
    files.forEach(async item => {
      const {status, signal} = await spawnSync('tinypng', [item])
      ctx.log.info('compress ' + item + ' done')
      if (signal || status !== 0) {
        throw new Error(`Can't compress '${item}', Please try tinypng ${item} directly!`)
      }
      compressedFiles.push(item)
    })
  }
  return compressedFiles
}
/*

for (let item of files) {
      ctx.log.info('compressFile working' + item)
      const {status, signal} = spawnSync('tinypng', [item])
      if (signal || status !== 0) {
        throw new Error(`Can't compress '${item}', Please try tinypng ${item} directly!`)
      }
      compressedFiles.push(item)
    }
    ctx.log.info('compressFile working end')
 */

const guiMenu = ctx => {
  return [
    {
      label: '打开InputBox',
      async handle (ctx, guiApi) {
        const value = await guiApi.showInputBox({
          title: '打开对话框',
          placeholder: '请输入文件地址'
        })
        guiApi.upload([value])
      }
    },
    {
      label: '打开Finder',
      async handle (ctx, guiApi) {
        const files = await guiApi.showFileExplorer({
          properties: ['openFile', 'multiSelections']
        })
        guiApi.upload(files)
      }
    }
  ]
}

const beforeTransformPlugins = {
  async handle (ctx) {
    try {
      const fs = ctx.input
      ctx.input = []
      ctx.input = await compressFile(ctx, fs)
      ctx.emit('notification', {
        title: '压缩完成',
        body: '开始上传'
      })
    } catch (err) {
      ctx.log.error('catch error..', err)
      ctx.input = []
      ctx.emit('notification', {
        title: '压缩图片失败',
        body: err,
        text: err
      })
    }
  }
}

module.exports = (ctx) => {
  const register = () => {
    ctx.helper.beforeTransformPlugins.register('ltan-img-press', beforeTransformPlugins)
  }
  return {
    register,
    guiMenu
  }
}
