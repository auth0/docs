# Auth0 Style Guide

This style guide will cover the terminology and content specific to Auth0, along with some comments on common writing issues.

For general software-industry styles and terminology, see the [Microsoft Manual of Style](https://eucalyptus.atlassian.net/wiki/download/attachments/76611622/microsoft_manual_of_style_fourth_edition.pdf?version=2&modificationDate=1424379604164&api=v2).

## Voice

Speak to the reader directly so that your document reads as if you were engaged in conversation. Address the reader as "you." Do not use indirect language such as "one" or other passive references. Avoid "we".

The active voice is most clear. The use of passive tense can confuse or mislead the reader. Avoid constructions such as "the function was called" or  "the password was entered." Instead, state exactly who or what issued the call or entered the password. Never leave the reader with uncertainty about cause and effect.

### Imperative mood

When directing the reader to perform a task, you can often omit the subject of the sentence: "Click **Save**."

### Gerunds
Gerunds make statements more passive. To discuss actions the reader must take, use the imperative form, not the gerund. For example, in a section about setting up SSH keys in which you are walking the user through the process, title the subhead "Set up your SSH keys" rather than "Setting up your SSH keys."

### Should, must, can, may

The use of "should" and other ambivalent statements should be avoided. If something is required, tell the user it "must" be performed.

Use "can" for most descriptions of available actions. Use "may" rarely and only for cases when the action is optional. Avoid "might".

### Gender-neutral pronouns

When a sentence cannot be constructed without a pronoun, the best solution for avoiding gender-specific pronouns or repetition of the subject is to use [singular they](https://en.wikipedia.org/wiki/Singular_they): "The user enters their password."

## Body text

### Paragraphs

Keep paragraphs short for internet reading.

### Subheads
Subheads are not intended to make independent statements. Therefore, reiterate in the paragraph text anything stated in the subhead. Do not use a subhead to introduce a separate idea and do not force the user to read the subhead to understand the text that follows.

## Abbreviations
Abbreviations should be avoided, including the use of e.g. Instead, use "for example." You want the content to flow smoothly, uninterrupted by questions the reader must ask himself regarding your intentions.

### Contractions

Avoid contractions in most cases; they sound too casual. Complete words are more authoritative.

### Compound words

Compound words may be used in three forms: one word, two words, or hyphenated. 

For example, when referring to something that happens at "run time", the proper format is two words. When referring to the "runtime engine", the proper format is a single word. And when using it as an adjective, such as "run-time execution", the proper format is the hyphenated form.

Other commonly encountered compound words include "server side" and "client side". The same rules apply. When you write code for the "client side", you use two words. When you write "client-side code", the adjective form uses a hyphen. "Client side" and "server side" are never single words (clientside).


## Punctuation

### Colons
Colons are useful when you are directly referring to an example, such as "Here is the relevant code:"

### Adjectives
Hyphens are used between adjectives and the verb they modify if and only if the adjective does not end in "ly." Therefore, "commonly used adjectives" is not hyphenated, while "oft-quoted phrase" is.

### Punctuation and quotes
In American English, punctuation properly belongs inside quotation marks. Therefore, if you incorporate a quote into a sentence, either within or at the end, such as our editor said "You must end quotations with periods inside the quotation marks," you would construct the quotation as shown here, with the comma inside the quotation marks.

The exception is when quoting code. If the code does not include the punctuation mark, do not place the punctuation mark inside the quotes.

## Formatting

### Titles and subheads

Only the first level title should be in "Title Case". All subheads should be in sentence case.

### Notes

**NOTE:** A note is at most two sentences that refer to the immediately preceding text to provide additional clarification. Do not use a block quote for notes; it makes them too prominent.

### Panels

::: panel-info Panels
Use a panel for information that applies to the overall document or to highlight information that must be taken into account, like version requirements.
:::

### Menu items

Use **Bold** when referring to menu items or fields in a webpage or UI.

### Parameters

Use `code_formatting` to refer to parameters and values.

### Links

The text of a link to additional information should be the title of the destination page, so the reader has some idea of the content being linked to. For more information, see: [Auth0 Style Guide](styleguide.md).

## Specific examples

### Click

Use "Click on" when referring to text links in a webpage or UI, "Click" when referring to a button.

For example: Click **Save**. Click on **This link**.

### Login

You can use **login** as a verb: Login to the dashboard.

### Access

Depending on the situation, the reader can "gain access", "grant access", or "allow access".

### Email

Use the un-hyphenated "email" to refer to an email address.

### The user

Refer to the developer's customer as the "user". Be sure to keep the idea of the user separate from the "you" of the developer being addressed.

### The dashboard

The [Auth0 management console](${uiURL}) is referred to as the "dashboard".






