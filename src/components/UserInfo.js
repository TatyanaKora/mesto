export default class UserInfo {
	constructor(profileName, profileJob) {
		this._name = document.querySelector(profileName);
		this._job = document.querySelector(profileJob);
		
	}
	getUserInfo() {
		 this._userInfo = {
			profilename: this._name.textContent,
			profilejob: this._job.textContent,
		}
		return this._userInfo;
	}
	setUserInfo(profilename, profilejob) {
		this._name.textContent = profilename;
		this._job.textContent = profilejob;
	}
}