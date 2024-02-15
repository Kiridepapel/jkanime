import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalScriptService {
  
  // Carga el script de Disqus
  public loadDisqusScript() {
    const script = document.createElement('script');
    script.src = 'https://fraxianime.disqus.com/embed.js';
    script.setAttribute('data-timestamp', `${+new Date()}`);
    (document.head || document.body).appendChild(script);
  }
}
