'use strict'

import { app, protocol, Menu, BrowserWindow, ipcMain, dialog, } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const Store = require('electron-store')
const store = new Store()
global.store = store
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// set menu
const template = [
  {
    label: app.name,
    submenu: [
      { label: '关于', role: 'about' },
      { label: '缩小', role: 'minimize' },
      { label: '退出', role: 'quit' }
    ]
  }
  // {
  //   label: '操作',
  //   submenu: [
  //     { label: '全选', role: 'selectAll' },
  //     { label: '复制', role: 'copy' },
  //     { label: '粘贴', role: 'paste' }
  //   ]
  // }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
let win
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}
function initSetting () {
  if (!store.get('setting')) {
    store.set('setting', {
      custom: 1
    })
  }
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  initSetting()
  createWindow()
  // 关闭软件
  ipcMain.on('open-close-dialog', (event, arg) => {
    dialog.showMessageBox(win, {
      type: 'info',
      title: '提示',
      message: '是否关闭应用程序？',
      buttons: ['取消', '关闭']
    })
      .then(res => {
        console.log(res)
        if (res.response === 1) {
          app.exit()
        } else {
          console.log('点击取消')
        }
      })
      .catch(error => {
        console.log(error)
      })
  })
})
// 快捷键
// app.whenReady().then(() => {
//   // Register a 'CommandOrControl+Y' shortcut listener.
//   globalShortcut.register('CommandOrControl+Y', () => {
//     // Do stuff when Y and either Command/Control is pressed.
//   })
// })
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
