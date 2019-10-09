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

import {Optional} from "./Monad";
import {Lang} from "./Lang";
import {DomQuery} from "./DomQuery";


export class XMLQuery {

    private rootNode: Array<Element> = [];

    constructor(...rootNode: Array<any>) {
        if (Optional.fromNullable(rootNode).isAbsent()) {
            return;
        } else if (rootNode[0] instanceof Array && rootNode.length == 1) {
            if (!(rootNode[0][0] instanceof DomQuery)) {
                this.rootNode = this.rootNode.concat(rootNode[0]);
            } else {
                for (let cnt = 0; cnt < rootNode[0].length; cnt++) {
                    rootNode[0][cnt].each((node: Element) => {
                        this.rootNode.push(node);
                    });
                }
            }
        } else {
            if (!(rootNode[0] instanceof DomQuery)) {
                this.rootNode = this.rootNode.concat(rootNode);
            } else {
                for (let cnt = 0; cnt < rootNode.length; cnt++) {
                    rootNode[cnt].each((node: Element) => {
                        this.rootNode.push(node);
                    });
                }
            }
        }
    }

    static fromString(data: string): XMLQuery {
        return XMLQuery.parseXML(data);
    }

    static parseXML(txt: string): XMLQuery {
        let ret = XMLQuery._parseXML(txt);
        return ret;
    }

    private static _parseXML(txt: string): XMLQuery {
        //from jquery
        let parsedXML;
        try {
            parsedXML = new DOMParser().parseFromString(txt, "text/xml");
        } catch (e) {
            parsedXML = undefined;
        }
        let retVal = new XMLQuery(Lang.instance.objToArray(parsedXML.childNodes));
        return retVal;
    }

    isAbsent() {
        return !this.rootNode.length;
    }

    isPresent() {
        return !this.isAbsent();
    }

    get length(): number {
        return this.rootNode.length;
    }


    private _getIf(tagsFound: Array<Node>, path: Array<String>, currLevel: Array<Node>) {
        let nameIdx = {};
        let tags = path[0].split(",");
        for (let cnt = 0; cnt < tags.length; cnt++) {
            nameIdx[Lang.instance.trim(tags[cnt])] = true;
        }

        if (path.length == 1) {
            for (let cnt = 0; currLevel && cnt < currLevel.length; cnt++) {
                if ((path[0] == "*") || nameIdx[currLevel[cnt].nodeName]) {
                    tagsFound.push(currLevel[cnt]);
                }
            }
            return;
        }

        for (let cnt = 0; currLevel && cnt < currLevel.length; cnt++) {
            if ((path[0] == "*") || nameIdx[currLevel[cnt].nodeName]) {

                this._getIf(tagsFound, path.slice(1, path.length), Lang.instance.objToArray(currLevel[cnt].childNodes))
            }
        }
    }

    getIf(...path: Array<string>): XMLQuery {
        let currLevel = this.rootNode;

        let tagsFound = [];

        for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
            this._getIf(tagsFound, path, Lang.instance.objToArray(this.rootNode[cnt].childNodes))
        }
        return new XMLQuery(tagsFound);
    }

    get(pos: number): XMLQuery {
        if (pos > this.rootNode.length - 1) {
            return XMLQuery.absent;
        }
        return new XMLQuery(this.rootNode[pos]);
    }

    get value(): Array<Element> {
        return this.rootNode;
    }

    get childNodes(): XMLQuery {
        let retVal = [];
        this.eachElem((item: Node) => {
            retVal = retVal.concat(Lang.instance.objToArray(item.childNodes))
        });

        return new XMLQuery(...retVal);
    }

    eachElem(func: (item: Node, cnt?: number) => any): XMLQuery {
        for (let cnt = 0, len = this.rootNode.length; cnt < len; cnt++) {
            if (func(this.get(cnt).value[0], cnt) === false) {
                break;
            }
        }
        return this;
    }


    each(func: (item: XMLQuery, cnt?: number) => any): XMLQuery {
        for (let cnt = 0, len = this.rootNode.length; cnt < len; cnt++) {
            if (func(this.get(cnt), cnt) === false) {
                break;
            }
        }
        return this;
    }

    private _byTagName(resArr: Array<Node>, node: Node, tagName: string) {
        if (node && node.nodeName == tagName) {
            resArr.push(node);
        }
        if (node.childNodes) {
            let nodeArr: Array<Element> = Lang.instance.objToArray(node.childNodes);
            for (let cnt = 0; cnt < nodeArr.length; cnt++) {
                this._byTagName(resArr, nodeArr[cnt], tagName);
            }
        }
    }

    byTagName(tagName: string): XMLQuery {
        let res = [];

        for (let cnt = 0; cnt < this.rootNode.length; cnt++) {
            this._byTagName(res, this.rootNode[cnt], tagName);
        }
        return new XMLQuery(res);
    }


    isXMLParserError(): boolean {

        return this.byTagName("parsererror").isPresent();
    }

    textContent(joinstr: string): string {
        let retStr = [];
        this.eachElem((item: Node) => {
            retStr.push((<any>item).textContent);
        });
        return retStr.join(joinstr || " ");
    }


    parserErrorText(joinstr: string): string {
        return this.byTagName("parsererror").textContent(joinstr);
    }

    getAttribute(key: string): Optional<string> {
        if (this.rootNode.length == 0) {
            return Optional.absent;
        }

        return Optional.fromNullable((<any>this.rootNode[0]).getAttribute(key));
    }

    //TODO insert attribute api like we have it on DomQuery

    toString(): string {
        let ret = [];
        this.eachElem((node: any) => {
            if (typeof (<any>window).XMLSerializer != "undefined") {
                ret.push(new (<any>window).XMLSerializer().serializeToString(node));
            } else if (typeof node.xml != "undefined") {
                ret.push(node.xml);
            }
        });
        return ret.join("");
    }


    get cDATAAsString(): string {
        let cDataBlock = [];
        // response may contain several blocks
        this.each((item: XMLQuery) => {
            item.childNodes.eachElem((node: Node) => {
                cDataBlock.push(<string>(<any>node).data);
            });
        });
        return cDataBlock.join('');
    }

    static absent = new XMLQuery();
}
