import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
export function baseInfo() {
    info({
      title: 'Not found',
      text: 'There is no such pictures on your request!',
    });
  }
