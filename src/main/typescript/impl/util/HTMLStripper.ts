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


import {Lang} from "./Lang";

/**
 * An isolated high performance html stripper
 */
export class HTMLStripper {

    /**
     * main parse routine parses the document for a given tag name
     *
     *
     * @param theString  the markup string to be parsed
     * @param tagNameStart the tag name to be parsed for
     */
    static parse(theString: string, tagNameStart: string) {

        let BEGIN_TAG = "html",
            _tagStart = -1,
            _tagEnd = -1,
            _contentStart = -1,
            _contentEnd = -1,
            _tokenPos = 0,
            _tokenForward = 1;

        tagNameStart = (!tagNameStart) ? BEGIN_TAG : tagNameStart;

        let proposedTagStartPos = theString.indexOf("<" + tagNameStart);
        //we use closures instead of private methods to improve the compressability

        let isValidPositionCombination = function (pos1, pos2, pos3, pos4) {
            return pos1 <= pos2 && pos3 <= pos4;
        };

        /**
         * trace for a forward comment
         *
         * @param theStr the string to be checked
         * @param tagPos the tag position from which the check onwards has to be perfomed
         * @return true in case a comment is found
         */
        let checkForwardForComment = function (theStr, tagPos) {
            let toCheck = theStr.substring(tagPos),
                indexOf = Lang.instance.hitch(toCheck, toCheck.indexOf),
                firstBeginComment = indexOf("<!--"),
                firstEndComment = indexOf("-->"),

                firstBeginCDATA = indexOf("<[CDATA["),
                firstEndCDATA = indexOf("]]>");

            if (isValidPositionCombination(firstBeginComment, firstEndComment, firstBeginCDATA, firstEndCDATA)) {
                return true;
            }

            return firstBeginComment <= firstEndComment && firstBeginCDATA <= firstEndCDATA;
        };

        /**
         * check backwards for a comment
         *
         * @param theStr the check string
         * @param tagPos the tag position from which the check should be performed
         * @return true in case a comment is found
         */
        let checkBackForComment = function (theStr, tagPos) {
            let toCheck = theStr.substring(tagPos),
                indexOf = Lang.instance.hitch(toCheck, toCheck.indexOf),
                lastBeginComment = indexOf("<!--"),
                lastEndComment = indexOf("-->"),
                lastBeginCDATA = indexOf("<[CDATA["),
                lastEndCDATA = indexOf("]]>");

            if (isValidPositionCombination(lastBeginComment, lastEndComment, lastBeginCDATA, lastEndCDATA)) {
                //TODO we have to handle the embedded cases, for now we leave them out
                return true;
            }
        };

        //no need for ll parsing a handful of indexofs instead of slower regepx suffices
        let theSubStr = Lang.instance.hitch(theString, theString.substring);
        while (_contentStart == -1 && proposedTagStartPos != -1) {
            if (checkBackForComment(theString, proposedTagStartPos)) {
                _tagStart = proposedTagStartPos;
                _contentStart = proposedTagStartPos + theSubStr(proposedTagStartPos).indexOf(">") + 1;
            }
            proposedTagStartPos = theSubStr(proposedTagStartPos + tagNameStart.length + 2).indexOf("<" + tagNameStart);
        }

        let proposedEndTagPos = theString.lastIndexOf("</" + tagNameStart);
        while (_contentEnd == -1 && proposedEndTagPos > 0) {
            if (checkForwardForComment(theString, proposedEndTagPos)) {
                _tagEnd = proposedEndTagPos;
                _contentEnd = proposedEndTagPos;
            }
            proposedTagStartPos = theSubStr(proposedTagStartPos - tagNameStart.length - 2).lastIndexOf("</" + tagNameStart);
        }
        if (_contentStart != -1 && _contentEnd != -1) {
            return theSubStr(_contentStart, _contentEnd);
        }
        return null;
    }
}