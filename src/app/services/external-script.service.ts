import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment-prod';

@Injectable({
  providedIn: 'root',
})
export class ExternalScriptService {
  private isProduction: boolean = environment.PRODUCTION;

  // Carga el script de Disqus
  public loadDisqusScript() {
    if (this.isProduction === true) {
      const script = document.createElement('script');
      script.src = 'https://fraxianime.disqus.com/embed.js';
      script.setAttribute('data-timestamp', `${+new Date()}`);
      (document.head || document.body).appendChild(script);
    }
  }

  public dos() {
    var Tawk_API: any = Tawk_API || {};
    var Tawk_LoadStart = new Date();
  
    (function () {
      var s1 = document.createElement('script');
      var s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/65d30cdd9131ed19d96e7f35/1hn06kgmr';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s1.onload = function () {
        Tawk_API = Tawk_API || {};
        Tawk_API.onLoad = function () {
          // Aquí puedes personalizar el widget de chat
          Tawk_API.setAttributes({
            'name': 'John Doe',
            'email': 'johndoe@example.com',
            // Puedes agregar más atributos personalizados según tu necesidad
          });
          // Aquí puedes mostrar o ocultar el widget de chat según tu lógica
          Tawk_API.toggle();
        };
      };
      s0.parentNode!.insertBefore(s1, s0);
    })();
  }

  public loadTawkChatScript() {
    var Tawk_API: any = Tawk_API || {}, Tawk_LoadStart = new Date();
      
    (function () {
      var s1 = document.createElement('script'),
        s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/65d30cdd9131ed19d96e7f35/1hn06kgmr';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode!.insertBefore(s1, s0);
    })();
  }
}
