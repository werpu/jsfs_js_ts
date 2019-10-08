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
var Messages_es = (function (_super) {
    __extends(Messages_es, _super);
    function Messages_es() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MSG_TEST = "Mensajeprueba";
        /*Messages*/
        _this.MSG_DEV_MODE = "Aviso. Este mensaje solo se envia porque el 'Project Stage' es 'Development' y no hay otros 'listeners' de errores registrados.";
        _this.MSG_AFFECTED_CLASS = "Clase Afectada=";
        _this.MSG_AFFECTED_METHOD = "M�todo Afectado=";
        _this.MSG_ERROR_NAME = "Nombre del Error=";
        _this.MSG_ERROR_MESSAGE = "Mensaje del Error=";
        _this.MSG_SERVER_ERROR_NAME = "Mensaje de error de servidor=";
        _this.MSG_ERROR_DESC = "Descripci�n del Error=";
        _this.MSG_ERROR_NO = "N�mero de Error=";
        _this.MSG_ERROR_LINENO = "N�mero de L�nea del Error=";
        /*Errors and messages*/
        _this.ERR_FORM = "El formulario de origen no ha podido ser determinado, debido a que el elemento no forma parte de un formulario o hay diversos formularios con elementos usando el mismo nombre o identificador. Parando el procesamiento de Ajax.";
        _this.ERR_VIEWSTATE = "jsf.viewState= el valor del par�metro no es de tipo 'form'!";
        _this.ERR_TRANSPORT = "El tipo de transporte {0} no existe";
        _this.ERR_EVT_PASS = "un evento debe ser transmitido (sea null o no definido)";
        _this.ERR_CONSTRUCT = "Partes de la respuesta no pudieron ser recuperadas cuando construyendo los datos del evento= {0} ";
        _this.ERR_MALFORMEDXML = "La respuesta del servidor no ha podido ser interpretada. El servidor ha devuelto una respuesta que no es xml !";
        _this.ERR_SOURCE_FUNC = "el origen no puede ser una funci�n (probablemente 'source' y evento no han sido definidos o son 'null'";
        _this.ERR_EV_OR_UNKNOWN = "Un objeto de tipo evento o desconocido debe ser pasado como segundo par�metro";
        _this.ERR_SOURCE_NOSTR = "el origen no puede ser 'string'";
        _this.ERR_SOURCE_DEF_NULL = "el origen debe haber sido definido o ser 'null'";
        //_Lang.js
        _this.ERR_MUST_STRING = "{0}: {1} namespace debe ser de tipo String";
        _this.ERR_REF_OR_ID = "{0}: {1} una referencia a un nodo o identificador tiene que ser pasada";
        _this.ERR_PARAM_GENERIC = "{0}: el par�metro {1} tiene que ser de tipo {2}";
        _this.ERR_PARAM_STR = "{0}: el par�metro {1} tiene que ser de tipo string";
        _this.ERR_PARAM_STR_RE = "{0}: el par�metro {1} tiene que ser de tipo string o una expresi�n regular";
        _this.ERR_PARAM_MIXMAPS = "{0}: han de ser pasados tanto un origen como un destino";
        _this.ERR_MUST_BE_PROVIDED = "{0}: {1} y {2} deben ser pasados";
        _this.ERR_MUST_BE_PROVIDED1 = "{0}: {1} debe estar definido";
        _this.ERR_REPLACE_EL = "replaceElements invocado mientras que evalNodes no es un an array";
        _this.ERR_EMPTY_RESPONSE = "{0}: �La respuesta no puede ser de tipo 'null' o vac�a!";
        _this.ERR_ITEM_ID_NOTFOUND = "{0}: el elemento con identificador {1} no ha sido encontrado";
        _this.ERR_PPR_IDREQ = "{0}: Error en PPR Insert, 'id' debe estar presente";
        _this.ERR_PPR_INSERTBEFID = "{0}: Error in PPR Insert, antes de 'id' o despu�s de 'id' deben estar presentes";
        _this.ERR_PPR_INSERTBEFID_1 = "{0}: Error in PPR Insert, antes de nodo con id {1} no existe en el documento";
        _this.ERR_PPR_INSERTBEFID_2 = "{0}: Error in PPR Insert, despu�s de nodo con id {1} no existe en el documento";
        _this.ERR_PPR_DELID = "{0}: Error durante borrado, id no presente en xml";
        _this.ERR_PPR_UNKNOWNCID = "{0}:  Desconocido Html-Component-ID= {1}";
        _this.ERR_NO_VIEWROOTATTR = "{0}: El cambio de atributos de ViewRoot attributes no es posible";
        _this.ERR_NO_HEADATTR = "{0}: El cambio de los atributos de Head attributes no es posible";
        _this.ERR_RED_URL = "{0}: Redirecci�n sin url";
        _this.ERR_REQ_FAILED_UNKNOWN = "La petici�n ha fallado con estado desconocido";
        _this.ERR_REQU_FAILED = "La petici�n ha fallado con estado {0} y raz�n {1}";
        _this.UNKNOWN = "DESCONOCIDO";
        return _this;
    }
    return Messages_es;
}(Messages_1.Messages));
exports.Messages_es = Messages_es;
