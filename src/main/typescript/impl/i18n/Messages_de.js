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
var Messages_de = (function (_super) {
    __extends(Messages_de, _super);
    function Messages_de() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MSG_TEST = "Testnachricht";
        /*Messages*/
        _this.MSG_DEV_MODE = "Sie sehen diese Nachricht, da sie sich gerade im Entwicklungsmodus befinden " +
            "und sie keine Fehlerbehandlungsfunktionen registriert haben.";
        _this.MSG_AFFECTED_CLASS = "Klasse=";
        _this.MSG_AFFECTED_METHOD = "Methode=";
        _this.MSG_ERROR_NAME = "Fehler Name=";
        _this.MSG_ERROR_MESSAGE = "Nachricht=";
        _this.MSG_SERVER_ERROR_NAME = "Server Fehler Name=";
        _this.MSG_ERROR_DESC = "Fehlerbeschreibung=";
        _this.MSG_ERROR_NO = "Fehlernummer=";
        _this.MSG_ERROR_LINENO = "Zeilennummer=";
        /*Errors and messages*/
        _this.ERR_FORM = "Das Quellformular konnte nicht gefunden werden. " +
            "Mögliche Gründe= Sie haben entweder kein formular definiert, oder es kommen mehrere Formulare vor, " +
            "die alle das auslösende Element mit demselben Namen besitzen. " +
            "Die Weitere Ajax Ausführung wird gestoppt.";
        _this.ERR_VIEWSTATE = "jsf.viewState= der Parameter ist not vom Typ form!";
        _this.ERR_TRANSPORT = "Transport typ {0} existiert nicht";
        _this.ERR_EVT_PASS = "Ein Event Objekt muss übergeben werden (entweder ein event Objekt oder null oder undefined)";
        _this.ERR_CONSTRUCT = "Teile des response konnten nicht ermittelt werden während die Event Daten bearbeitet wurden= {0} ";
        _this.ERR_MALFORMEDXML = "Es gab zwar eine Antwort des Servers, jedoch war diese nicht im erwarteten XML Format. Der Server hat kein valides XML gesendet! Bearbeitung abgebrochen.";
        _this.ERR_SOURCE_FUNC = "source darf keine Funktion sein";
        _this.ERR_EV_OR_UNKNOWN = "Ein Ereignis Objekt oder UNKNOWN muss als 2. Parameter übergeben werden";
        _this.ERR_SOURCE_NOSTR = "source darf kein String sein";
        _this.ERR_SOURCE_DEF_NULL = "source muss entweder definiert oder null sein";
        //_Lang.js
        _this.ERR_MUST_STRING = "{0}: {1} namespace muss vom Typ String sein";
        _this.ERR_REF_OR_ID = "{0}: {1} Ein Referenzknoten oder id muss übergeben werden";
        _this.ERR_PARAM_GENERIC = "{0}: Paramter {1} muss vom Typ {2} sein";
        _this.ERR_PARAM_STR = "{0}: Parameter {1} muss vom Typ String sein";
        _this.ERR_PARAM_STR_RE = "{0}: Parameter {1} muss entweder ein String oder ein Regulärer Ausdruck sein";
        _this.ERR_PARAM_MIXMAPS = "{0}: both a source as well as a destination map must be provided";
        _this.ERR_MUST_BE_PROVIDED = "{0}: ein {1} und ein {2} müssen übergeben werden";
        _this.ERR_MUST_BE_PROVIDED1 = "{0}: {1} muss gesetzt sein";
        _this.ERR_REPLACE_EL = "replaceElements aufgerufen während evalNodes nicht ein Array ist";
        _this.ERR_EMPTY_RESPONSE = "{0}: Die Antwort darf nicht null oder leer sein!";
        _this.ERR_ITEM_ID_NOTFOUND = "{0}: Element mit ID {1} konnte nicht gefunden werden";
        _this.ERR_PPR_IDREQ = "{0}: Fehler im PPR Insert, ID muss gesetzt sein";
        _this.ERR_PPR_INSERTBEFID = "{0}: Fehler im PPR Insert, before ID oder after ID muss gesetzt sein";
        _this.ERR_PPR_INSERTBEFID_1 = "{0}: Fehler im PPR Insert, before  Knoten mit ID {1} Existiert nicht";
        _this.ERR_PPR_INSERTBEFID_2 = "{0}: Fehler im PPR Insert, after  Knoten mit ID {1} Existiert nicht";
        _this.ERR_PPR_DELID = "{0}: Fehler im PPR delete, id ist nicht im xml Markup vorhanden";
        _this.ERR_PPR_UNKNOWNCID = "{0}: Unbekannte Html-Komponenten-ID= {1}";
        _this.ERR_NO_VIEWROOTATTR = "{0}: Änderung von ViewRoot Attributen ist nicht erlaubt";
        _this.ERR_NO_HEADATTR = "{0}: Änderung von Head Attributen ist nicht erlaubt";
        _this.ERR_RED_URL = "{0}: Redirect ohne URL";
        _this.ERR_REQ_FAILED_UNKNOWN = "Anfrage mit unbekanntem Status fehlgeschlagen";
        _this.ERR_REQU_FAILED = "Anfrage mit Status {0} and Ursache {1} fehlgeschlagen";
        _this.UNKNOWN = "Unbekannt";
        return _this;
    }
    return Messages_de;
}(Messages_1.Messages));
exports.Messages_de = Messages_de;
