/* Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Messages_1 = require("./Messages");
var Messages_it = (function (_super) {
    __extends(Messages_it, _super);
    function Messages_it() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /*Messages*/
        _this.MSG_DEV_MODE = "Questo messaggio � stato inviato esclusivamente perch� il progetto � in development stage e nessun altro listener � stato registrato.";
        _this.MSG_AFFECTED_CLASS = "Classi coinvolte:";
        _this.MSG_AFFECTED_METHOD = "Metodi coinvolti:";
        _this.MSG_ERROR_NAME = "Nome dell'errore:";
        _this.MSG_ERROR_MESSAGE = "Nome dell'errore:";
        _this.MSG_ERROR_DESC = "Descrizione dell'errore:";
        _this.MSG_ERROR_NO = "Numero errore:";
        _this.MSG_ERROR_LINENO = "Numero di riga dell'errore:";
        /*Errors and messages*/
        _this.ERR_FORM = "Il Sourceform non puo' essere determinato a causa di una delle seguenti ragioni= l'elemento non e' agganciato ad un form oppure sono presenti pi� form con elementi con lo stesso nome, il che blocca l'elaborazione ajax";
        _this.ERR_VIEWSTATE = "jsf.viewState= il valore del parametro non � di tipo form!";
        _this.ERR_TRANSPORT = "Il transport type {0} non esiste";
        _this.ERR_EVT_PASS = "� necessario passare un evento (sono accettati anche gli event object null oppure undefined) ";
        _this.ERR_CONSTRUCT = "Durante la costruzione dell' event data= {0} non � stato possibile acquisire alcune parti della response ";
        _this.ERR_MALFORMEDXML = "Il formato della risposta del server non era xml, non � stato quindi possibile effettuarne il parsing!";
        _this.ERR_SOURCE_FUNC = "source non puo' essere una funzione (probabilmente source and event non erano stati definiti o sono null";
        _this.ERR_EV_OR_UNKNOWN = "Come secondo parametro bisogna passare un event object oppure unknown";
        _this.ERR_SOURCE_NOSTR = "source non pu� essere una stringa di testo";
        _this.ERR_SOURCE_DEF_NULL = "source deve essere definito oppure  null";
        //_Lang.js
        _this.ERR_MUST_STRING = "{0}: {1} namespace deve essere di tipo String";
        _this.ERR_REF_OR_ID = "{0}: {1} un reference node oppure un identificatore deve essere fornito";
        _this.ERR_PARAM_GENERIC = "{0}: il parametro {1} deve essere di tipo {2}";
        _this.ERR_PARAM_STR = "{0}: {1} parametro deve essere di tipo String";
        _this.ERR_PARAM_STR_RE = "{0}: {1} parametro deve essere di tipo String oppure una regular expression";
        _this.ERR_PARAM_MIXMAPS = "{0}: � necessario specificare sia  source che destination map";
        _this.ERR_MUST_BE_PROVIDED = "{0}: � necessario specificare sia {1} che {2} ";
        _this.ERR_MUST_BE_PROVIDED1 = "{0}: {1} deve essere settato";
        _this.ERR_REPLACE_EL = "replaceElements chiamato metre evalNodes non � un array";
        _this.ERR_EMPTY_RESPONSE = "{0}: La response non puo' essere nulla o vuota!";
        _this.ERR_ITEM_ID_NOTFOUND = "{0}: non � stato trovato alcun item con identificativo {1}";
        _this.ERR_PPR_IDREQ = "{0}: Errore durante la PPR Insert, l' id deve essere specificato";
        _this.ERR_PPR_INSERTBEFID = "{0}: Errore durante la PPR Insert, before id o after id deve essere specificato";
        _this.ERR_PPR_INSERTBEFID_1 = "{0}: Errore durante la PPR Insert, before node of id {1} non esiste nel document";
        _this.ERR_PPR_INSERTBEFID_2 = "{0}: Errore durante la PPR Insert, after  node of id {1} non esiste nel in document";
        _this.ERR_PPR_DELID = "{0}: Errore durante la delete, l'id non e' nella forma di un markup xml";
        _this.ERR_PPR_UNKNOWNCID = "{0}:   Html-Component-ID= {1} sconosciuto";
        _this.ERR_NO_VIEWROOTATTR = "{0}: La modifica degli attributi del ViewRoot non � supportata";
        _this.ERR_NO_HEADATTR = "{0}: La modifica degli attributi di Head non � supportata";
        _this.ERR_RED_URL = "{0}: Redirect senza url";
        return _this;
    }
    return Messages_it;
}(Messages_1.Messages));
exports.Messages_it = Messages_it;
