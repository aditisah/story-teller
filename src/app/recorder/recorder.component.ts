import {
    TNSRecorder,
    AudioRecorderOptions
  } from 'nativescript-audio';
  import { File, knownFolders, isAndroid } from '@nativescript/core';
//import { android } from '@nativescript/core/application';
//import { android } from '@nativescript/core/application';
declare var android;

  export class SomeClassInYourProject {
    private _recorder: TNSRecorder;

    constructor() {
      this._recorder = new TNSRecorder();
    }

    public startRecordingAudio() {
      if (!TNSRecorder.CAN_RECORD()) {
        console.log('crud, this device cannot record audio');
        return;
      }

      const audioFolder = knownFolders.currentApp().getFolder('audio');

      let androidFormat;
      let androidEncoder;
      if (isAndroid) {
        androidFormat =  android.media.MediaRecorder.OutputFormat.MPEG_4;
        androidEncoder = android.media.MediaRecorder.AudioEncoder.AAC;
      }

      const recorderOptions: AudioRecorderOptions = {
        filename: `${audioFolder.path}/recording.${isAndroid ? 'm4a' : 'caf'}`,

        format: androidFormat,

        encoder: androidEncoder,

        metering: true,

        infoCallback: infoObject => {
          console.log(JSON.stringify(infoObject));
        },

        errorCallback: errorObject => {
          console.log(JSON.stringify(errorObject));
        }
      };

      this._recorder
        .start(recorderOptions)
        .then(result => {
          console.log('recording has started', result);
        })
        .catch(err => {
          console.log('oh no, something is wrong and recording did not start');
        });
    }

    public pause() {
      this._recorder
        .pause()
        .then(result => {
          console.log('recording has been paused');
        })
        .catch(err => {
          console.log('recording could not be paused');
        });
    }

    public async stop() {
      const stopResult = await this._recorder.stop().catch(err => {
        console.log('oh no recording did not stop correctly');
      });
      if (stopResult) {
        console.log('recording stopped successfully.');
      }
    }

    // public getFile() {
    //   try {
    //     const audioFolder = knownFolders.currentApp().getFolder('audio');
    //     const recordedFile = audioFolder.getFile(
    //       `recording.${isAndroid ? 'm4a' : 'caf'}`
    //     );
    //     console.log(JSON.stringify(recordedFile));
    //     console.log('recording exists: ' + File.exists(recordedFile.path));
    //     this.recordedAudioFile = recordedFile.path;
    //   } catch (ex) {
    //     console.log(ex);
    //   }
    // }

    // public async dispose() {
    //   const disposeResult = await this._recorder.dispose().catch(err => {
    //     dialogs.alert({
    //       message: `Dispose Error: ${err}`,
    //       okButtonText: 'Okay'
    //     });
    //   });
    //   console.log('disposeResult', disposeResult);
    //   this._recorder = new TNSRecorder();
    // }
  }
