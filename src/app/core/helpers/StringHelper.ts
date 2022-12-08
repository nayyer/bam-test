//import * as moment from 'jalali-moment';
export class StringHelper
{

  getHourAndMinutes(date: Date)
  {
    return new Date(date).getHours() + ':' + new Date(date).getUTCMinutes()
  }


  /**
   * Remove all characters in the char set from right and left sides of the string
   */
  static trim(word: string, charSet: any = [])
  {
    /**
     * Return an empty string if given string is not defined
     */
    if (!word)
    {
      return '';
    }

    /**
     * Trim left side of the string
     */
    word = StringHelper.leftTrim(word, charSet)

    /**
     * Trim right side of the string
     */
    word = StringHelper.rightTrim(word, charSet)

    /**
     * Return value
     */
    return word;
  }


  /**
   * Remove all characters in the char set from left side of the string
   */
  static leftTrim(word: string, charSet: any = [])
  {
    /**
     * Return an empty string if given string is not defined
     */
    if (!word)
    {
      return '';
    }

    /**
     * Add white spaces to list of characters set
     */
    charSet.push(" ");
    charSet.push("\r");
    charSet.push("\n");
    charSet.push("\t");

    /**
     * Remove all characters in the Char Set from left side of the string
     */
    while (word.length > 0 && charSet.indexOf(word[0]) !== -1)
    {
      word = word.slice(1);
    }

    return word;
  }


  /**
   * Remove all characters in the char set from right side of the string
   */
  static rightTrim(word: string, charSet: any = [])
  {
    /**
     * Return an empty string if given string is not defined
     */
    if (!word)
    {
      return '';
    }

    /**
     * Add white spaces to list of characters set
     */
    charSet.push(" ");
    charSet.push("\r");
    charSet.push("\n");
    charSet.push("\t");

    /**
     * Remove all characters in the Char Set from right side of the string
     */
    while (word.length > 0 && charSet.indexOf(word[word.length - 1]) !== -1)
    {
      word = word.slice(0, -1);
    }

    return word;
  }

  /**
   * Convert file size to human readable string
   * @param {number} fileSize The number of bytes
   * @return {String} Human readable file size
   */
  static getReadableFileSize(fileSize: number)
  {
    let K = 1024,
        M = K * 1024,
        G = M * 1024,
        T = G * 1024;


    if (fileSize >= T)
    {
      return Math.round(fileSize / T) + ' TB';
    }
    else if (fileSize >= G)
    {
      return Math.round(fileSize / G) + ' GB';
    }
    else if (fileSize >= M)
    {
      return Math.round(fileSize / M) + ' MB';
    }
    else if (fileSize >= K)
    {
      return Math.round(fileSize / K) + ' KB';
    }
    else
    {
      return fileSize + ' B';
    }

  }

  /**
   * Convert number to human readable string
   * @param {number} price The amount
   * @return {String} Human readable file size
   */
  static getReadablePrice(price: number):string
  {
    let K = 1000,
        M = K * 1000,
        B = M * 1000,
        T = B * 1000;


    if (price >= T)
    {
      return Math.round(price / T) + ' T';
    }
    else if (price >= B)
    {
      return Math.round(price / B) + ' B';
    }
    else if (price >= M)
    {
      return Math.round(price / M) + ' M';
    }
    else if (price >= K)
    {
      return Math.round(price / K) + ' K';
    }
    else
    {
      return price + ' B';
    }

  }

  /**
   * Convert file size to human readable string
   * @param {Integer} fileSize The number of bytes
   * @return {String} Human readable file size
   */
  static getReadableFileSizeInPersian(fileSize: number)
  {
    let K = 1024,
        M = K * 1024,
        G = M * 1024,
        T = G * 1024;


    if (fileSize >= T)
    {
      return Math.round(fileSize / T) + ' ترابایت';
    }
    else if (fileSize >= G)
    {
      return Math.round(fileSize / G) + ' گیگابایت';
    }
    else if (fileSize >= M)
    {
      return Math.round(fileSize / M) + ' مگابایت';
    }
    else if (fileSize >= K)
    {
      return Math.round(fileSize / K) + ' کیلوبایت';
    }
    else
    {
      return fileSize + ' بایت';
    }

  }

  /**
   * Generate random string
   *
   * @return {String} The 32 characters random string
   */
  static getRandomString(length: number = 32)
  {
    let randomString    = "",
        legalCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        timestamp       = Date.now().toString();

    /**
     * Create 19 characters string just with alphabetic characters and numbers
     */
    for (var i = 0; i < length - timestamp.length; i++)
    {
      randomString += legalCharacters.charAt(Math.floor(Math.random() * legalCharacters.length));
    }

    /**
     * Append current timestamp to guarantee the uniqueness
     */
    randomString += timestamp;


    /**
     * Return the random string
     */
    return randomString;
  }


  /**
   * Getting all regex matches
   */
  static getAllRegexMatches(str: string, pattern: RegExp)
  {
    let matches,
        regexResults = [];

    do
    {
      /**
       * Execute regex search
       */
      matches = pattern.exec(str);


      if (matches !== null)
      {
        /**
         * Add matches to list
         */
        regexResults.push(matches);
      }
    }
    while (matches); //Check whether anything matched or not

    /**
     * Return list of matches
     */
    return regexResults;
  }


  static getTruncatedString(word: string, maxLength: number = 100)
  {
    //if(document){
    //  let temporalDivElement = document.createElement("div");
    //  // Set the HTML content with the providen
    //  temporalDivElement.innerHTML = str;
    //
    //
    //  if (temporalDivElement.innerText.length > maxLength)
    //  {
    //    return temporalDivElement.innerText.substring(0, maxLength) + '...';
    //  }
    //  else
    //  {
    //    return temporalDivElement.innerText;
    //  }
    //}
    //
    //

  }

  /**
   * @return {boolean} url validity
   * @param {String} url
   * */
  static isUrl(url: string): boolean
  {
    let pattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
    return pattern.test(String(url));
  }


  /**
   * check email regex
   * @returns {boolean} email validity
   * @param  {String} email
   * */
  static isEmail(email: string)
  {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return pattern.test(email)
  }

  /**
   * check email regex
   * @returns {boolean} email validity
   * @param  {String} email
   * */
  static isPasswordStrength(password: string)
  {
    let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return pattern.test(password)
  }

  /**
   * check national code regex
   * @returns {boolean} national code validity
   * @param  {String} nationalCode
   * */
  static isNationalCode(nationalCode: string)
  {
    return this.nationalCodeRegex().test(nationalCode)
  }
  /**
   * check mobile regex
   * @returns {boolean} mobile validity
   * @param  {String} mobile
   * */
  static isMobile(mobile: string)
  {
    return this.mobileRegex().test(mobile)
  }

  static nationalCodeRegex()
  {
    return /^[0-9]{10}$/g;
  }

  static mobileRegex()
  {
    return /^(\+98|0098|0)9\d{9}$/g;
  }

  static uppercaseRegex()
  {
    return /[A-Z]/;
  }

  static lowercaseRegex()
  {
    return /[a-z]/;
  }

  static characterRegex()
  {
    return /(?=.*[a-z])(?=.*[A-Z])/;
  }

  static specialCharRegex()
  {
    return /[!@#$%^&*]/;
  }
  static numberRegex()
  {
    return /[0-9]/;
  }
  static min8CharsRegex()
  {
    return /^.{8,}$/;
  }
  static min6CharsRegex()
  {
    return /^.{6,}$/;
  }
  static exact6CharsRegex()
  {
    return /^.{6}$/;
  }
  static userNameRegex(){
    return /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/
  }

  static phoneNumberRegex(){
    return /^(\+[0-9]|\+98|0098|0)\d{5,}$/;
  }

  static zipCodeRegex(){
    return /^[0-9]{10}$/
  }

  static checkLatinCharacterRegex(){
    return /\d|\w|[\.\$@\*\\\/\+\-\^\!\(\)\[\]\~\%\#\&\=\?\>\<\{\}\"\'\,\:\;\_]/g
  }


  // /**
  //  *
  //  * @param {number} timestamp
  //  * @returns {string}
  //  */
  // static getJalaliDate(timestamp: any, format: string = 'YYYY/M/D' , lang:string ='fa'): string
  // {
  //   let jDate: moment.Moment = moment(timestamp);
  //   jDate.locale(lang);
  //   return jDate.format(format);
  // }

}
