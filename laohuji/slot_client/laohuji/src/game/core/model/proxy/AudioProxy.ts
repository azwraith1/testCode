/*
 * @Author: Li MengChan 
 * @Date: 2018-06-25 14:25:57 
 * @Last Modified by:   Li MengChan 
 * @Last Modified time: 2018-06-25 14:25:57 
 * @Description: 音频管理模块
 */
module game {
	export class AudioProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "AudioProxy";
		public isOpen: boolean;
		public channel: egret.SoundChannel;
		public backgroundSound: egret.Sound;
		public moveChannel: egret.SoundChannel;
		public constructor() {
			super(AudioProxy.NAME);
		}


		public initMusic() {
			if(this.backgroundSound){
				this.backgroundSound.close();
				this.backgroundSound = null;
			}
			this.backgroundSound = RES.getRes("background_mp3");
			if(this.backgroundSound){
				this.backgroundSound.play(0, -1)
			}
		}

		public init() {
			Global.audioProxy = this;
			// var number: string = egret.localStorage.getItem(GameConfig.GAME_ID + '.sound');
			// this.isOpen = number && number === '0' ? false : true;
		}


		public closeBgMusic() {
			if (!this.isOpen) {
				return;
			}
			if (this.channel) {
				this.channel.stop();
				this.backgroundSound = null;
				//                this.channel = null;
			}
		}

		public setVolice(vol: number) {
			if (this.moveChannel) {
				this.moveChannel.volume = vol;
			}
		}

		public startBgMusic() {
			if (!this.isOpen) {
				return;
			}
			if (!this.backgroundSound) {
				this.backgroundSound = RES.getRes("background_mp3");
				if (this.channel) {
					this.channel.stop();
					this.channel = null;
				}
				this.channel = this.backgroundSound.play(0, -1);
			}
		}


		public openSound(isOpen: boolean): void {
			egret.localStorage.setItem("test" + '.sound', isOpen ? '1' : '0');
			if (isOpen) {
				window['audioAutoPlay']("background");
			} else {
				window['stopAudio']("background");
			}
		}
        /**
         * 播放音效
         * resourceName： 文件名称
         */
		public playSound(resourceName) {
			if (this.isOpen) {
				var sound: egret.Sound = RES.getRes(resourceName);
				if (sound) {
					sound.play(0, 1);
				}
			}
		}

        /**
         * 播放音效
         * resourceName： 文件名称
         */
		public playSoundCount(resourceName, count, voilce: number = 1) {
			if (this.isOpen) {
				var sound: egret.Sound = RES.getRes(resourceName);
				//                this.moveChannel = sound.play(0, 0);
				this.moveChannel = sound.play(0, count);
				this.moveChannel.volume = voilce;
			}
		}
	}
}
