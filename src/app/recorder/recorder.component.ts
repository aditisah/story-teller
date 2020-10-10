// // import { Component, OnInit } from '@angular/core';

// // @Component({
// //   selector: 'ns-recorder',
// //   templateUrl: './recorder.component.html',
// //   styleUrls: ['./recorder.component.css']
// // })
// // export class RecorderComponent implements OnInit {

// //   constructor() { }

// //   ngOnInit(): void {
// //   }

// // }


// import { Component, OnInit } from '@angular/core';
// import { Application } from '@nativescript/core';
// import { android } from '@nativescript/core/application';
// import { hasPermission, requestPermission } from 'nativescript-permissions';
// import { TNSRecordI } from '../../../src/common';
// import { AudioRecorderOptions } from '../../../src/options';
// @Component({
//        selector: 'ns-recorder',
//        templateUrl: './recorder.component.html',
//        styleUrls: ['./recorder.component.css']
//      })
// export class RecorderComponent implements TNSRecordI {
//   private _recorder: any;
//   //android: any;
//   get android() {
//     return this._recorder;
//   }

//   public static CAN_RECORD(): boolean {
//     const pManager = Application.android.context.getPackageManager();
//     const canRecord = pManager.hasSystemFeature(
//       android.content.pm.PackageManager.FEATURE_MICROPHONE
//     );
//     if (canRecord) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   public requestRecordPermission(explanation = '') {
//     return new Promise(async (resolve, reject) => {
//       try {
//         await requestPermission(
//           (this.android as any).Manifest.permission.RECORD_AUDIO
//         ).catch(err => {
//           reject(err);
//         });
//         resolve();
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }

//   public hasRecordPermission() {
//     const permission = hasPermission(
//       (android as any).Manifest.permission.RECORD_AUDIO
//     );
//     return !0 === permission ? !0 : !1;
//   }

//   public start(options: AudioRecorderOptions): Promise<any> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         // bake the permission into this so the dev doesn't have to call it
//         await this.requestRecordPermission().catch(err => {
//           console.log(err);
//           reject('Permission to record audio is not granted.');
//         });

//         if (this._recorder) {
//           // reset for reuse
//           this._recorder.reset();
//         } else {
//           this._recorder = new this.android.media.MediaRecorder();
//         }

//         const audioSource = options.source ? options.source : 0;
//         this._recorder.setAudioSource(audioSource);

//         const outFormat = options.format ? options.format : 0;
//         this._recorder.setOutputFormat(outFormat);

//         const encoder = options.encoder ? options.encoder : 0;
//         this._recorder.setAudioEncoder(encoder);

//         if (options.channels) {
//           this._recorder.setAudioChannels(options.channels);
//         }
//         if (options.sampleRate) {
//           this._recorder.setAudioSamplingRate(options.sampleRate);
//         }
//         if (options.bitRate) {
//           this._recorder.setAudioEncodingBitRate(options.bitRate);
//         }

//         this._recorder.setOutputFile(options.filename);

//         // On Error
//         this._recorder.setOnErrorListener(
//           new this.android.media.MediaRecorder.OnErrorListener({
//             onError: (recorder: any, error: number, extra: number) => {
//               options.errorCallback({ recorder, error, extra });
//             }
//           })
//         );

//         // On Info
//         this._recorder.setOnInfoListener(
//           new this.android.media.MediaRecorder.OnInfoListener({
//             onInfo: (recorder: any, info: number, extra: number) => {
//               options.infoCallback({ recorder, info, extra });
//             }
//           })
//         );

//         this._recorder.prepare();
//         this._recorder.start();

//         resolve();
//       } catch (ex) {
//         reject(ex);
//       }
//     });
//   }

//   public getMeters(): number {
//     if (this._recorder != null) return this._recorder.getMaxAmplitude();
//     else return 0;
//   }

//   public pause(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       try {
//         if (this._recorder) {
//           this._recorder.pause();
//         }
//         resolve();
//       } catch (ex) {
//         reject(ex);
//       }
//     });
//   }

//   public resume(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       try {
//         if (this._recorder) {
//           this._recorder.resume();
//         }
//         resolve();
//       } catch (ex) {
//         reject(ex);
//       }
//     });
//   }

//   public stop(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       try {
//         if (this._recorder) {
//           this._recorder.stop();
//         }
//         resolve();
//       } catch (ex) {
//         reject(ex);
//       }
//     });
//   }

//   public dispose(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       try {
//         if (this._recorder) {
//           this._recorder.release();
//         }
//         this._recorder = undefined;
//         resolve();
//       } catch (ex) {
//         reject(ex);
//       }
//     });
//   }
// }


