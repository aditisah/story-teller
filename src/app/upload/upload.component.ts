
//  import { Component, OnInit } from '@angular/core';

//  @Component({
//    selector: 'ns-upload',
//    templateUrl: './upload.component.html',
//    styleUrls: ['./upload.component.css']
//  })
//  export class UploadComponent implements OnInit {

//    constructor() { }

//    ngOnInit(): void {
//    }

//  }
import { Component, OnInit } from '@angular/core';
import { TNSPlayer } from 'nativescript-audio';
import { from } from 'rxjs';
import { isIOS } from 'tns-core-modules/platform';
@Component({
        selector: 'ns-upload',
        templateUrl: './upload.component.html',
        styleUrls: ['./upload.component.css']
      })
export class UploadComponent implements OnInit {
  private _player: TNSPlayer;
  private duration;
  constructor() {

  }
  ngOnInit(): void {
    this._player = new TNSPlayer();
    // You can pass a duration hint to control the behavior of other application that may
    // be holding audio focus.
    // For example: new  TNSPlayer(AudioFocusDurationHint.AUDIOFOCUS_GAIN_TRANSIENT);
    // Then when you play a song, the previous owner of the
    // audio focus will stop. When your song stops
    // the previous holder will resume.
    this._player.debug = true; // set true to enable TNSPlayer console logs for debugging.
    this._player
      .initFromFile({
        audioFile: 'https://www.w3schools.com/html/horse.mp3', // ~ = app directory
        loop: false,
        completeCallback: this._trackComplete.bind(this),
        errorCallback: this._trackError.bind(this),
      })
      .then(() => {
        this._player.getAudioTrackDuration().then((duration) => {
          // iOS: duration is in seconds
          // Android: duration is in milliseconds
          //let current = this._player.currentTime
          if (isIOS) {
           const duration = 10000;
            //current *= 1000
          }

          //this.progress = Math.ceil(current / duration * 100);

          //this.isPlaying = this._player.isAudioPlaying()

          console.log(`song duration:`, duration);
        });
      });
  }

  public togglePlay() {
    if (this._player.isAudioPlaying()) {
      this._player.pause();
    } else {
      this._player.play();
    }
  }

  private _trackComplete(args: any) {
    console.log('reference back to player:', args.player);
    // iOS only: flag indicating if completed succesfully
    console.log('whether song play completed successfully:', args.flag);
  }

  private _trackError(args: any) {
    console.log('reference back to player:', args.player);
    console.log('the error:', args.error);
    // Android only: extra detail on error
    console.log('extra info on the error:', args.extra);
        }

}
