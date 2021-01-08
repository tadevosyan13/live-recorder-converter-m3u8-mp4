import {
    Component,
    OnInit,
    OnDestroy,
    ElementRef, AfterViewInit
} from '@angular/core';

import * as RecordRTC from 'recordrtc';
import videojs from 'video.js';
import * as Record from 'videojs-record/dist/videojs.record.js';

import 'webrtc-adapter';
import 'videojs-record/dist/plugins/videojs.record.ts-ebml.js';
import {BlobService} from '../hero.service';

@Component({
    selector: 'app-videojs-record',
    templateUrl: './videojs-record.component.html',
    styleUrls: ['./videojs-record.component.css']
})
export class VideojsRecordComponent implements OnInit, OnDestroy , AfterViewInit {

    private _elementRef: ElementRef;
    public downloadUrl:any;
    public loader = false;
    idx = 'clip1';

    private config: any;
    private player: any;
    private plugin: any;

    // constructor initializes our declared vars
    constructor(elementRef: ElementRef, private blobService:BlobService) {
        this.player = false;

        // save reference to plugin (so it initializes)
        this.plugin = Record;

        // video.js configuration
        this.config = {
            controls: true,
            autoplay: false,
            fluid: false,
            loop: false,
            width: 300,
            height: 300,
            bigPlayButton: false,
            controlBar: {
                volumePanel: false
            },
            plugins: {
                // configure videojs-record plugin
                record: {
                    audio: true,
                    video:true,
                    debug: true,
                    maxLength: 36000,
                    timeSlice: 1000,
                    videoMimeType: "video/mp4",
                    convertEngine: 'ts-ebml',
                }
            }
        };
    }

    ngOnInit() {
    }


    play(url){
        var player = videojs('example-video');
        player.src({
            src: url,
            type: 'application/x-mpegURL',
        });
        player.play();
        this.downloadUrl = url;
    }


    download(){

        if (this.downloadUrl){
            this.loader = true;
            this.blobService.sendBlob(this.downloadUrl).subscribe((res:any) => {
                if (res){
                    this.loader = false;
                }
            });
        }else {
            alert('Set Stream URL');
        }
    }

    // use ngAfterViewInit to make sure we initialize the videojs element
    // after the component template itself has been rendered
    ngAfterViewInit() {
        // ID with which to access the template's video element
        let el = 'video_' + this.idx;

        // setup the player via the unique element ID
        this.player = videojs(document.getElementById(el), this.config, () => {
            console.log('player ready! id:', el);

            // print version information at startup
            var msg = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record') +
                ' and recordrtc ' + RecordRTC.version;
            videojs.log(msg);
        });

        // device is ready
        this.player.on('deviceReady', () => {
            console.log('device is ready!');
        });

        // user clicked the record button and started recording
        this.player.on('startRecord', () => {
            console.log('started recording!');
        });

        // user completed recording and stream is available
        this.player.on('finishRecord', () => {
            // recordedData is a blob object containing the recorded data that
            // can be downloaded by the user, stored on server etc.
            console.log('finished recording: ', this.player.recordedData);
            this.player.record().saveAs({'video': 'stream.mp4'});
        });

        // error handling
        this.player.on('error', (element, error) => {
            console.warn(error);
        });

        this.player.on('deviceError', () => {
            console.error('device error:', this.player.deviceErrorCode);
        });

        let that = this;
        let segmentNumber = 0;

        this.player.on('timestamp', function() {
            if (that.player.recordedData && that.player.recordedData.length > 0) {
                let binaryData = that.player.recordedData[that.player.recordedData.length - 1];
                segmentNumber++;
                // timestamps
                console.log('current timestamp: ', that.player.currentTimestamp);
                console.log('all timestamps: ', that.player.allTimestamps);
                // stream data
                console.log('array of blobs: ', binaryData);
            }
        });

    }

    // use ngOnDestroy to detach event handlers and remove the player
    ngOnDestroy() {
        if (this.player) {
            this.player.dispose();
            this.player = false;
        }
    }

}