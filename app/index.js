'use strict';
const { app, dialog, shell, Menu, BrowserWindow } = require('electron');

require('electron-reload')(__dirname);
//require('electron-debugger')();

var mainWindow;
function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  var win = new BrowserWindow({
    width: width,
    height: height,
    minWidth: 800,
    title: 'Electro App'
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);

  return win;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
  if (Menu.getApplicationMenu()) return;

  const template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (() => {
            return (process.platform === 'darwin') ? 'Ctrl+Command+F' : 'F11';
          })(),
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        }
        /*,
        {
          label: 'Toggle Developer Tools',
          accelerator: (() => {
            return (process.platform === 'darwin') ? 'Alt+Command+I' : 'Ctrl+Shift+I'
          })(),
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.toggleDevTools()
          }
        }*/
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://github.com/garrylachman/ElectroCRUD');
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: 'Electron',
      submenu: [
        {
          label: 'About ElectroCRUD',
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Electron',
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() { app.quit(); }
        }
      ]
    });
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    );
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
