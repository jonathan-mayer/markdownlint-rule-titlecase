// @ts-check

"use strict";

const { addError, forEachHeading, escapeForRegExp } = require("markdownlint-rule-helpers");
const { titleCase } = require("title-case");

module.exports = {
  "names": [ "titlecase-rule" ],
  "description": "Titlecase rule",
  "tags": [ "titlecase" ],
  "function": function rule(params, onError) {
    forEachHeading(params, (heading) => {
        const { line, lineNumber } = heading;
        const escapedLine = line.replace(/\{(.*?)\}/, '').replace(/\`(.*?)\`/, '');
        const titled = titleCase(escapedLine);
        if (titled != escapedLine) {
          const column = 1;
          const length = line.length;
          addError(
            onError,
            lineNumber,
            `Title Case: 'Expected ${titled}, found ${escapedLine}'`,
            null,
            [ column, length ],
            { // delete the whole line and insert the changed one
              "editColumn": column,
              "deleteCount": length, 
              "insertText": titled
            }
          );
        }
      });
  }
};
