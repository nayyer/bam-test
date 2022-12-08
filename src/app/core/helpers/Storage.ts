import {Inject, PLATFORM_ID} from "@angular/core";

export class Storage
{
constructor(@Inject(PLATFORM_ID) private platformId: Object,){}


	static set(key: string, value: any)
	{
		if (typeof value !== "string")
		{
			value = JSON.stringify(value);
		}


		try
		{
			localStorage.setItem(key, value)
		}
		catch (ex)
		{
			console.log("Out of space");
			/**
			 * @todo
			 */
			// NotificationToaster.showWarningMessage("فضای ذخیره سازی شما پر شده است، لطفا آن را افزایش دهید.");
		}

	}

	static get(key: string)
	{
		let value: any = localStorage.getItem(key);

		if (typeof value === typeof undefined || value === null)
		{
			return null;
		}


		try
		{
			value = JSON.parse(value);
		}
		catch (ex)
		{}

		return value;
	}

	static remove(key: string)
	{
		localStorage.removeItem(key);
	}

	static clear()
	{
		localStorage.clear();
	}
}
