# Auth0 Style Guide

This style guide will cover the terminology and content specific to Auth0, along with some comments on common writing issues.

For general software-industry styles and terminology, see the [Microsoft Manual of Style](https://eucalyptus.atlassian.net/wiki/download/attachments/76611622/microsoft_manual_of_style_fourth_edition.pdf?version=2&modificationDate=1424379604164&api=v2).

## Voice

It is important to speak to the reader directly, to engage in a conversation with the reader. This is the most effective way to communicate. In order to do this, address the reader as "you." Do not use such indirect language as "one" or other passive ways of addressing the user. Avoid "we".

Active voice is extremely important. It's more than style. When you use passive voice, it can actually confuse or mislead the reader. Avoid constructions such as "the function was called" or  "the password was entered." Instead, say exactly who or what issued the call or entered the password. Never leave the reader with uncertainty about cause and effect or who did what.

Subheads are not intended to make statements. Therefore, make sure to repeat in the body text anything you say in a subhead. Do not use a subhead to introduce a new idea, and do not force the user to read the subhead to understand the text that follows.

Use of gerunds makes a statement more passive. To discuss actions the user must take, use the imperative form, not the gerund. For example, in a section about setting up SSH keys in which you are walking the user through the process, title the subhead "Set up Your SSH Keys" rather than "Setting up Your SSH Keys."

Abbreviations should be avoided. Avoid the use of e.g., for example. Instead, use "for example." The idea is to prevent the reader from having to stop and think about what you mean. It may seem like it just takes a second, but it is similar to tuning your web site performance. You want your site to perform quickly and smoothly. Similarly, you want your content to flow smoothly, uninterrupted by questions the reader must ask himself regarding your intentions.

The use of should versus must and other ambivalent statements must be avoided. If something is required, be definite about it and tell the user it "must" be performed.

Use "can" for most descriptions of available actions. Use "may" rarely and only for cases when the action is optional. Avoid "might".

## Paragraphs

Keep paragraphs short for internet reading.

## Imperative Sentences

When directing the reader to perform a task, you can often omit the subject of the sentence: Click **Save**.

## Singular they

When a sentence cannot be constructed without a pronoun, the best solution for avoiding gender-specific pronouns or repitition of the subject is to use [singular they](https://en.wikipedia.org/wiki/Singular_they): The user enters their password.

## Compound words

Compound words may be used in three forms: one word, two words, and hyphenated. As an example, let's look at runtime.

When referring to something that happens at run time, the proper format is two words. When referring to the runtime engine that runs or translates the code, the proper format is a single word. Finally, when using run time as an adjective, such as run-time execution, the proper format is the hyphenated form.

Other commonly encountered compound words include server side and client side. The same rules apply. When you write code for the client side, you use two words. When you write client-side code, because client-side is an adjective here, use the hyphenated form. Client side and server side are never single words (clientside).

## Punctuation

<b>Colons</b>
Colons are useful when you are directly referring to an example, such as "here is the relevant code:"

<b>Adjectives</b>
Hyphens are used between adjectives and the verb they modify if and only if the adjective does not end in "ly." Therefore, "commonly used adjectives" is not hyphenated, while "oft-quoted phrase" is.

<b>Punctuation and quotes</b>
In American English, but not British English, punctuation properly belongs inside quotation marks. Therefore, if you incorporate a quote into a sentence, either within or at the end, such as our editor said "You must end quotations with periods inside the quotation marks," you would construct the quotation as you see here, with the comma inside the quotation marks.

If this becomes an issue when quoting code because the code does not include the punction mark in question, do not place the punctuation mark inside the quotes.

## Formatting

### Titles and subheads

Only the first level title should be in Title Case. All subheads should be in sentence case.

### Notes

**NOTE:** A note is a at most two sentences that refer to the immediately preceding text to provide additional clarification. Do not use block quote style for notes, it makes the note too prominent.

### Panels

::: panel-info Panels
Use a panel for information that applies to the overall document or to highlight information that must be taken into account, like version requirements.
:::

### Menu items

Use **Bold** when refering to menu items or fields in a webpage or UI.

### Parameters

Use `code_formatting` to refer to parameters and values.

### Links

The text of a link to additional information should be the title of the destination page, so the user has some idea of the content being linked to. For more information, see: [Auth0 Style Guide](/styleguide).

## Specific examples

### Click

Use "Click on" when refering to text links in a webpage or UI, "Click" when refering to a button.

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

The [Auth0 management console](${uiURL}) is refered to as the "dashboard".






