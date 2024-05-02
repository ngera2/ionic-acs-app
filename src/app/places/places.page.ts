import { Component, OnInit } from '@angular/core';
import { CallClient, LocalVideoStream, VideoStreamRenderer } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';

// const { CallClient, VideoStreamRenderer, LocalVideoStream } = require('@azure/communication-calling');
// const { AzureCommunicationTokenCredential } = require('@azure/communication-common');
// const { AzureLogger, setLogLevel } = require("@azure/logger");

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {


  // Calling web sdk objects
  callAgent: any;
  deviceManager: any;
  call: any;
  incomingCall: any;
  localVideoStream: any;
  localVideoStreamRenderer: any;

  // UI widgets
  userAccessToken = <HTMLInputElement>window.document.getElementById('user-access-token');
  calleeAcsUserId = <HTMLInputElement>document.getElementById('callee-acs-user-id');
  initializeCallAgentButton = <HTMLInputElement>document.getElementById('initialize-call-agent');
  startCallButton = <HTMLInputElement>document.getElementById('start-call-button');
  hangUpCallButton = <HTMLInputElement>document.getElementById('hangup-call-button');
  acceptCallButton = <HTMLInputElement>document.getElementById('accept-call-button');
  startVideoButton = <HTMLInputElement>document.getElementById('start-video-button');
  stopVideoButton = <HTMLInputElement>document.getElementById('stop-video-button');
  connectedLabel = <HTMLInputElement>document.getElementById('connectedLabel');
  remoteVideosGallery = <HTMLInputElement>document.getElementById('remoteVideosGallery');
  localVideoContainer = <HTMLInputElement>document.getElementById('localVideoContainer');
  userAccessTokenValue: string = '';
  calleeUserId : string = '';
  disableInitializeAgentBtn: boolean = false;

  constructor() { }

  ngOnInit() {
    this.userAccessToken = <HTMLInputElement>window.document.getElementById('user-access-token');
    this.calleeAcsUserId = <HTMLInputElement>document.getElementById('callee-acs-user-id');
    this.initializeCallAgentButton = <HTMLInputElement>document.getElementById('initialize-call-agent');
    this.startCallButton = <HTMLInputElement>document.getElementById('start-call-button');
    this.hangUpCallButton = <HTMLInputElement>document.getElementById('hangup-call-button');
    this.acceptCallButton = <HTMLInputElement>document.getElementById('accept-call-button');
    this.startVideoButton = <HTMLInputElement>document.getElementById('start-video-button');
    this.stopVideoButton = <HTMLInputElement>document.getElementById('stop-video-button');
    this.connectedLabel = <HTMLInputElement>document.getElementById('connectedLabel');
    this.remoteVideosGallery = <HTMLInputElement>document.getElementById('remoteVideosGallery');
    this.localVideoContainer = <HTMLInputElement>document.getElementById('localVideoContainer');
    // this.userAccessTokenValue = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVFODQ4MjE0Qzc3MDczQUU1QzJCREU1Q0NENTQ0ODlEREYyQzRDODQiLCJ4NXQiOiJYb1NDRk1kd2M2NWNLOTVjelZSSW5kOHNUSVEiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOmMzNDBhNWM1LTk5ZTMtNDRhMy1iMmRmLTQ2NGU5YjI3Njc0ZV8wMDAwMDAxYy0zM2ExLTdlMjktOTljNi01OTNhMGQwMDQxOGUiLCJzY3AiOjE3OTIsImNzaSI6IjE2OTg5OTA5MDUiLCJleHAiOjE2OTkwNzczMDUsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6InZvaXAiLCJyZXNvdXJjZUlkIjoiYzM0MGE1YzUtOTllMy00NGEzLWIyZGYtNDY0ZTliMjc2NzRlIiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6MTY5ODk5MDkwNX0.NviaENuVA4CT-glHl0WbgvMMBuxDq-jpwxAIT-DgyUZe-iJdJyXmGlgmnvto_Wv6XXwxOOaN9308iFIVbzO_RGtyc_lp4rKuZEhg6MqlcXjOpU9Jv0JeK0FCgKq_IlRnNiBQYQr8fOUER6Fte5iQwoj7rvy4Z77wNM7Fi9JS97hfyvO3eseniFIEDPb-tKsW6UWTJXrhTL3qneMLyVWNSwKX_apRayuDbHG_UTEs8F1OVe2W0cjEyxBS8ghROAy8p9qBkPXskjEX1ntJpYRpmqfevTiUnOzL0Xyfg-CT-vz05wOkt8w4UUWA-4jUiGyhm6U3QA8NlzClseQ3IybZ3w";
    this.userAccessTokenValue = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOmNkZTFlMjdlLTQ5MzctNGMyOC1iYjQ2LWM0YjQ0YTNjODY2NV8wMDAwMDAxZi1jOWM2LWY2NjQtMGQ4Yi0wODQ4MjIwMGI3YzQiLCJzY3AiOjE3OTIsImNzaSI6IjE3MTQzOTQ4NDUiLCJleHAiOjE3MTQ0ODEyNDUsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6InZvaXAiLCJyZXNvdXJjZUlkIjoiY2RlMWUyN2UtNDkzNy00YzI4LWJiNDYtYzRiNDRhM2M4NjY1IiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6MTcxNDM5NDg0NX0.L3JputMjz9g4KArvxUx27LllGKNUPQD5hdCfLYc8HSr2gCgSCpS_hzgiNwQhomgCuOiwMPEE5SYJ-Gcid4A2LDVNZd5hKz0nGoxm6EKYR6D4iXmKAwFbUpWUz9c-fgRWEahpuc-YIKPhyjYYAB1NVIKPcUmVgPIHTSun0cVyJj9uRfDE7v7IF_-elxWBbX2bBF75eVDNOBR3tap5nvji4L2uT_WaNkOK7rkMiK9OtrbSqtW4RlxkImebjfwmc5dD-9lI2BiFXGyypjZervEERI5zjv635UkNNQRwYGk9mlYpkitqWdKZWxLkwcsazOPi4x4JfKJOxyhfvxsZcoM_mw";
    this.calleeUserId = '8:acs:c340a5c5-99e3-44a3-b2df-464e9b27674e_0000001c-33a0-be1f-02c3-593a0d00504a';

    this.userAccessToken.value = this.userAccessTokenValue;

    this.calleeAcsUserId.value = this.calleeUserId;
  }

  // checkAndGrantPermissions(){
  //   this.androidPermission.checkPermission(this.androidPermission.PERMISSION.CAMERA).then(
  //     result=> console.log('has permission::', result.hasPermission),
  //     err=> this.androidPermission.requestPermission(this.androidPermission.PERMISSION.CAMERA)
  //   )
  //   // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS])
  // }

  // Set the log level and output
  // setLogLevel('verbose');

  // AzureLogger.log = (...args) => {
  //     console.log(...args);
  // };

  hiThere(){
    console.log('clicked::', this.userAccessToken?.value);
  }

  /**
   * Using the CallClient, initialize a CallAgent instance with a CommunicationUserCredential which enable us to make outgoing calls and receive incoming calls. 
   * You can then use the CallClient.getDeviceManager() API instance to get the DeviceManager.
   */
  // initializeCallAgentButton.onclick = async () => {

  async initializeCallAgent() {
    try {
      // this.checkAndGrantPermissions();
      const callClient = new CallClient();
      // let tokenCredential = new AzureCommunicationTokenCredential(this.userAccessToken?.value.trim());
      let tokenCredential = new AzureCommunicationTokenCredential(this.userAccessTokenValue);
      this.callAgent = await callClient.createCallAgent(tokenCredential)
      // Set up a camera device to use.
      let deviceManager = await callClient.getDeviceManager();
      // await deviceManager.askDevicePermission({ video: true, audio: false });
      await deviceManager.askDevicePermission({ audio: true, video: false });
      // Listen for an incoming call to accept.
      this.callAgent.on('incomingCall', async (args: any) => {
        try {
          this.incomingCall = args.incomingCall;
          this.acceptCallButton.disabled = false;
          this.startCallButton.disabled = true;
        } catch (error) {
          console.error(error);
        }
      });

      this.startCallButton.disabled = false;
      // this.initializeCallAgentButton.disabled = true;
      this.disableInitializeAgentBtn = true;
    } catch (error) {
      console.error(error);
    }
  }


  /**
   * Place a 1:1 outgoing video call to a user
   * Add an event listener to initiate a call when the `startCallButton` is clicked:
   * First you have to enumerate local cameras using the deviceManager `getCameraList` API.
   * In this quickstart we're using the first camera in the collection. Once the desired camera is selected, a
   * LocalVideoStream instance will be constructed and passed within `videoOptions` as an item within the
   * localVideoStream array to the call method. Once your call connects it will automatically start sending a video stream to the other participant. 
   */
  async startCall() {
    try {
      //const localVideoStream = await createLocalVideoStream();
      const videoOptions = this.localVideoStream ? { localVideoStreams: [this.localVideoStream] } : undefined;
      // this.call = this.callAgent.startCall([{ communicationUserId: this.calleeAcsUserId.value.trim() }], { videoOptions });
      this.call = this.callAgent.startCall([{ communicationUserId: this.calleeUserId }], { videoOptions });
      
      // Subscribe to the call's properties and events.
      this.subscribeToCall(this.call);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Accepting an incoming call with video
   * Add an event listener to accept a call when the `acceptCallButton` is clicked:
   * After subscribing to the `CallAgent.on('incomingCall')` event, you can accept the incoming call.
   * You can pass the local video stream which you want to use to accept the call with.
   */
  async acceptCall() {
    try {
      //const localVideoStream = await createLocalVideoStream();
      const videoOptions = this.localVideoStream ? { localVideoStreams: [this.localVideoStream] } : undefined;
      this.call = await this.incomingCall.accept({ videoOptions });
      // Subscribe to the call's properties and events.
      this.subscribeToCall(this.call);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Subscribe to a call obj.
   * Listen for property changes and collection updates.
   */
  subscribeToCall(call: any) {
    try {
      // Inspect the initial call.id value.
      console.log(`Call Id: ${call.id}`);
      //Subscribe to call's 'idChanged' event for value changes.
      call.on('idChanged', () => {
        console.log(`Call Id changed: ${call.id}`);
      });

      // Inspect the initial call.state value.
      console.log(`Call state: ${call.state}`);
      // Subscribe to call's 'stateChanged' event for value changes.
      call.on('stateChanged', async () => {
        console.log(`Call state changed: ${call.state}`);
        if (call.state === 'Connected') {
          this.connectedLabel.hidden = false;
          this.acceptCallButton.disabled = true;
          this.startCallButton.disabled = true;
          this.hangUpCallButton.disabled = false;
          this.startVideoButton.disabled = false;
          this.stopVideoButton.disabled = false;
          this.remoteVideosGallery.hidden = false;
        } else if (call.state === 'Disconnected') {
          this.connectedLabel.hidden = true;
          this.startCallButton.disabled = false;
          this.hangUpCallButton.disabled = true;
          this.startVideoButton.disabled = true;
          this.stopVideoButton.disabled = true;
          console.log(`Call ended, call end reason={code=${call.callEndReason.code}, subCode=${call.callEndReason.subCode}}`);
        }
      });

      call.localVideoStreams.forEach(async (lvs: any) => {
        this.localVideoStream = lvs;
        await this.displayLocalVideoStream();
      });
      call.on('localVideoStreamsUpdated', (e: any) => {
        e.added.forEach(async (lvs: any) => {
          this.localVideoStream = lvs;
          await this.displayLocalVideoStream();
        });
        e.removed.forEach((lvs: any) => {
          this.removeLocalVideoStream();
        });
      });

      // Inspect the call's current remote participants and subscribe to them.
      call.remoteParticipants.forEach((remoteParticipant: any) => {
        this.subscribeToRemoteParticipant(remoteParticipant);
      });
      // Subscribe to the call's 'remoteParticipantsUpdated' event to be
      // notified when new participants are added to the call or removed from the call.
      call.on('remoteParticipantsUpdated', (e: any) => {
        // Subscribe to new remote participants that are added to the call.
        e.added.forEach((remoteParticipant: any) => {
          this.subscribeToRemoteParticipant(remoteParticipant)
        });
        // Unsubscribe from participants that are removed from the call
        e.removed.forEach((remoteParticipant: any) => {
          console.log('Remote participant removed from the call.');
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
 * Subscribe to a remote participant obj.
 * Listen for property changes and collection udpates.
 */
  subscribeToRemoteParticipant(remoteParticipant: any) {
    try {
      // Inspect the initial remoteParticipant.state value.
      console.log(`Remote participant state: ${remoteParticipant.state}`);
      // Subscribe to remoteParticipant's 'stateChanged' event for value changes.
      remoteParticipant.on('stateChanged', () => {
        console.log(`Remote participant state changed: ${remoteParticipant.state}`);
      });

      // Inspect the remoteParticipants's current videoStreams and subscribe to them.
      remoteParticipant.videoStreams.forEach((remoteVideoStream: any) => {
        this.subscribeToRemoteVideoStream(remoteVideoStream)
      });
      // Subscribe to the remoteParticipant's 'videoStreamsUpdated' event to be
      // notified when the remoteParticiapant adds new videoStreams and removes video streams.
      remoteParticipant.on('videoStreamsUpdated', (e: any) => {
        // Subscribe to new remote participant's video streams that were added.
        e.added.forEach((remoteVideoStream: any) => {
          this.subscribeToRemoteVideoStream(remoteVideoStream)
        });
        // Unsubscribe from remote participant's video streams that were removed.
        e.removed.forEach((remoteVideoStream: any) => {
          console.log('Remote participant video stream was removed.');
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Subscribe to a remote participant's remote video stream obj.
   * You have to subscribe to the 'isAvailableChanged' event to render the remoteVideoStream. If the 'isAvailable' property
   * changes to 'true', a remote participant is sending a stream. Whenever availability of a remote stream changes
   * you can choose to destroy the whole 'Renderer', a specific 'RendererView' or keep them, but this will result in displaying blank video frame.
   */
  subscribeToRemoteVideoStream = async (remoteVideoStream: any) => {
    let renderer = new VideoStreamRenderer(remoteVideoStream);
    let view: any;
    let remoteVideoContainer = document.createElement('div');
    remoteVideoContainer.className = 'remote-video-container';

    let loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    remoteVideoStream.on('isReceivingChanged', () => {
      try {
        if (remoteVideoStream.isAvailable) {
          const isReceiving = remoteVideoStream.isReceiving;
          const isLoadingSpinnerActive = remoteVideoContainer.contains(loadingSpinner);
          if (!isReceiving && !isLoadingSpinnerActive) {
            remoteVideoContainer.appendChild(loadingSpinner);
          } else if (isReceiving && isLoadingSpinnerActive) {
            remoteVideoContainer.removeChild(loadingSpinner);
          }
        }
      } catch (e) {
        console.error(e);
      }
    });

    const createView = async () => {
      // Create a renderer view for the remote video stream.
      view = await renderer.createView();
      // Attach the renderer view to the UI.
      remoteVideoContainer.appendChild(view.target);
      this.remoteVideosGallery.appendChild(remoteVideoContainer);
    }

    // Remote participant has switched video on/off
    remoteVideoStream.on('isAvailableChanged', async () => {
      try {
        if (remoteVideoStream.isAvailable) {
          await createView();
        } else {
          view.dispose();
          this.remoteVideosGallery.removeChild(remoteVideoContainer);
        }
      } catch (e) {
        console.error(e);
      }
    });

    // Remote participant has video on initially.
    if (remoteVideoStream.isAvailable) {
      try {
        await createView();
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
  * Start your local video stream.
  * This will send your local video stream to remote participants so they can view it.
  */
  async startVideo() {
    try {
      const localVideoStream = await this.createLocalVideoStream();
      await this.call.startVideo(localVideoStream);
    } catch (error) {
      console.error(error);
    }
  }

  /**
  * Stop your local video stream.
  * This will stop your local video stream from being sent to remote participants.
  */
  async stopVideo() {
    try {
      await this.call.stopVideo(this.localVideoStream);
    } catch (error) {
      console.error(error);
    }
  }

  /**
  * To render a LocalVideoStream, you need to create a new instance of VideoStreamRenderer, and then
  * create a new VideoStreamRendererView instance using the asynchronous createView() method.
  * You may then attach view.target to any UI element. 
  */
  createLocalVideoStream = async () => {
    const camera = (await this.deviceManager.getCameras())[0];
    if (camera) {
      return new LocalVideoStream(camera);
    } else {
      console.error(`No camera device found on the system`);
    }
    return;
  }

  /**
  * Display your local video stream preview in your UI
  */
  displayLocalVideoStream = async () => {
    try {
      this.localVideoStreamRenderer = new VideoStreamRenderer(this.localVideoStream);
      const view = await this.localVideoStreamRenderer.createView();
      this.localVideoContainer.hidden = false;
      this.localVideoContainer.appendChild(view.target);
    } catch (error) {
      console.error(error);
    }
  }

  /**
  * Remove your local video stream preview from your UI
  */
  removeLocalVideoStream = async () => {
    try {
      this.localVideoStreamRenderer.dispose();
      this.localVideoContainer.hidden = true;
    } catch (error) {
      console.error(error);
    }
  }

  /**
  * End current call
  */
  async hangUpCall() {
    // end the current call
    await this.call.hangUp();
  }
  rejectIncomingCall(){
    this.incomingCall.reject();
  }
 
  muteOngoingCall(){
    this.call.mute();
  }
 
  unmuteOngoingCall()
  {
    this.call.unmute();
  }

}
