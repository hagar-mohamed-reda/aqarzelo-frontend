import { Router } from '@angular/router';
import { Translation } from './translation';


export class Helper {



  public static refreshComponent(router: Router, url) {
    router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      router.navigate([url]);
    });
    setTimeout(() => {
      let doc: any = document;
      doc.jquery('.modal-backdrop fade in').remove();
    }, 1000);
  }

  /**
   * translate word
   *
   * @param word
   */
  public static trans(word: string) {
    word = word.replace(/\s/g, '_');
    word = word.toLocaleLowerCase();
    // load translations from cache
    const transWord = Translation.TRANSLATION_DATA[word];//getTranslationsData()[word];

    if (transWord) {
      return transWord['name_'+Translation.getLang()];
    }
    Translation.storeNewKey(word);
    return word;
  }

  public static print() {
    let doc: any = document;
    doc.printJs();
  }


  public static setFile(event, key, model) {
    model[key] = event.target.files[0];
  }

  /**
   * convert javascript object to formData object
   * @param resource java script object
   * @returns FormData object
   */
  public static toFormData(resource) {
    let data = new FormData();
    for(let key of Object.keys(resource)) {
      if(resource[key])
        data.append(key, resource[key]);
    }
    return data;
  }

  public static loadImage(event, key, model) {
    Helper.setFile(event, key, model);
    var reader = new FileReader();
    reader.readAsDataURL(model[key]);
    reader.onload = (_event) => {
      model[key+"_url"] = reader.result;
    }
  }

  /**
   * open new window in the browser
   *
   * @param url: String url of the page
   */
  public static openWindow(url) {
    const options = "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=905,height=484";
    window.open(url, "_blank", options);
  }

  /**
   * validate on object from array of attributes
   *
   * @param model
   * @param requireds
   */
  public static validator(model, attributes: any) {
    let valid = true;
    attributes.forEach(element => {
      if (!model[element])
        valid = false;
    });
    return valid;
  }
}

