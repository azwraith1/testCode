module game {
    export class AudioManager {
        private static _audioManager: AudioManager;
        private constructor() {
            let sound: string = egret.localStorage.getItem(GameConfig.SOUND_NAME);
            if (sound) {
                if (parseInt(sound) == 1)
                    this._isPlaySound = true;
                else if (parseInt(sound) == 0)
                    this._isPlaySound = false;
            }
            else {
                this._isPlaySound = true;
                egret.localStorage.setItem(GameConfig.SOUND_NAME, "1");
            }
            let music: string = egret.localStorage.getItem(GameConfig.MUSIC_NAME);
            if (music) {
                if (parseInt(music) == 1)
                    this._isPlayMusic = true;
                else if (parseInt(music) == 2)
                    this._isPlayMusic = false;
            }
            else {
                this._isPlayMusic = true;
                egret.localStorage.setItem(GameConfig.MUSIC_NAME, "1");
            }
        }

        private _isPlaySound: boolean;
        private _isPlayMusic: boolean;
        private pauseMusic: boolean = null;
        private currentMusicName: string = "";
        public static getInstance(): AudioManager {
            if (!this._audioManager)
                this._audioManager = new AudioManager();
            return this._audioManager;
        }

        private majiangMusic: egret.Sound;
        private majiangMusicChannel: egret.SoundChannel;
        private homeMusic: egret.Sound;
        private homeChannel: egret.SoundChannel;

        /**
         * 播放首页背景
         * @param  {} muscName
         */
        public playMajiangMusic(muscName) {
            game.AudioManager.getInstance().closeHomeMusic();
            if (this.currentMusicName == muscName) {
                return;
            }
            this.currentMusicName = muscName;
            if (!this.isPlayMusic) {
                return;
            }
            if (!this.majiangMusic) {
                this.majiangMusic = this.getMusic(muscName);
                if (!this.majiangMusic) {
                    return;
                }
            }
            if (this.majiangMusicChannel) {
                this.majiangMusicChannel.stop();
            }
            if (this.majiangMusic) {
                this.majiangMusicChannel = this.majiangMusic.play(0);

            }
        }


        /**
         * 播放首页背景
         * @param  {} muscName
         */
        public playHomeMusic(muscName) {
            game.AudioManager.getInstance().closeMajiangMusic();
            if (this.currentMusicName == muscName) {
                return;
            }
            this.currentMusicName = muscName;
            if (!this.isPlayMusic) {
                return;
            }
            if (!this.homeMusic) {
                this.homeMusic = this.getMusic(muscName);
                if (!this.homeMusic) {
                    return;
                }
            }
            if (this.homeChannel) {
                this.homeChannel.stop();
            }
            if (this.homeMusic) {
                this.homeChannel = this.homeMusic.play(0);
            }

        }

        /**
         * 关闭首页背景
         * @param  {} muscName
         */
        public closeHomeMusic() {
            if (this.homeChannel) {
                this.homeChannel.stop();
                this.homeChannel = null;
                // this.currentMusicName = "";
            }
        }

        /**
         * 关闭首页背景
         * @param  {} muscName
         */
        public closeMajiangMusic() {
            if (this.majiangMusicChannel) {
                this.majiangMusicChannel.stop();
                this.majiangMusicChannel = null;

            }
        }


        public playMusic() {
            if (this.currentMusicName == "home_bg_mp3") {
                this.currentMusicName = null;
                this.playHomeMusic("home_bg_mp3");
            } else {
                this.currentMusicName = null;
                this.playMajiangMusic("playingingame_mp3");
            }
        }

        public stopMusic() {
            this.closeHomeMusic();
            this.closeMajiangMusic();
        }

        /**
         * 获取音乐资源
         * @param  {} name
         */
        private getMusic(name) {
            let data = GameCacheManager.instance.getCache(name);
            if (!data) {
                data = RES.getRes(this.currentMusicName);
                if (data) {
                    GameCacheManager.instance.setCache(name, data);
                }
            }
            return data;
        }

        private sound: any = {};
        playSound(url: string) {
            if (this._isPlaySound && GameConfig.IS_RUNNING) {
                // url += "_mp3";
                if (this.sound[url] && this.sound[url].sound) {
                    try {
                        this.sound[url].channel = this.sound[url].sound.play(0, 1);
                    } catch (e) {
                        LogUtils.logI("playMusic 报错" + url);
                    }
                }
                else {
                    let sound = RES.getRes(url);
                    if (!sound) {
                        return;
                    }
                    if (sound) {
                        this.sound[url] = new SoundItem();
                        this.sound[url].sound = sound;
                    }
                    if (this.sound[url].sound) {
                        try {
                            this.sound[url].channel = this.sound[url].sound.play(0, 1);
                        } catch (e) {
                            LogUtils.logI("播放出错")
                        }

                    }
                }
            }
        }

        stopSound(url: string) {
            // url += "_mp3";
            if (this.sound && this.sound[url]) {
                this.sound[url].channel.stop();
            }
        }



        public set isPlayMusic(value: boolean) {
            if (value) {
                this._isPlayMusic = true;
                this.playMusic();
                egret.localStorage.setItem(GameConfig.MUSIC_NAME, "1");
            }
            else {
                this._isPlayMusic = false;
                this.stopMusic();
                egret.localStorage.setItem(GameConfig.MUSIC_NAME, "0");
            }
        }

        public get isPlayMusic() {
            return this._isPlayMusic;
        }

        public set isPlaySound(value: boolean) {
            if (value) {
                this._isPlaySound = true;
                egret.localStorage.setItem(GameConfig.SOUND_NAME, "1");
            }
            else {
                this._isPlaySound = false;
                egret.localStorage.setItem(GameConfig.SOUND_NAME, "0");
            }
        }

        public get isPlaySound() {
            return this._isPlaySound;

        }
    }

    class SoundItem {
        public url: string;
        public sound: egret.Sound;
        public channel: egret.SoundChannel;
    }
}