export default class UserInfo {
	constructor(profileName, profileJob, profileAvatar) {
		this._name = document.querySelector(profileName);
		this._about = document.querySelector(profileJob);
		this._avatar = document.querySelector(profileAvatar);
		this.userId = null;
	}
 

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      userId: this.userId,
    };
  }

  setUserInfo(name, about, avatar) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }

  setUserAvatar(avatar) {
    this._avatar = avatar;
  }
  setUserId(userId) {
    this.userId = userId
  }
  getUserId() {
    return this.userId
  }
  }