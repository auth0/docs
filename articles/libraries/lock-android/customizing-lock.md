# Lock Android: Customizing Lock

Lock UI can be customized by creating your own `A0Theme` and overriding the default one before displaying your `Lock` activity:

### Register a Change

Your first step is to create a `Theme` builder, in which you will specify your desired modifications. In this case, we modify the header's `TitleColor`:

```java
Theme customizedLockTheme = Theme.newBuilder()
	.withHeaderTitleColor(R.color.headerTitleColor)
	.build();
```

Once you have the customized theme, you only need to add it while you're creating the Lock activity.

```java
this.lock = Lock.newBuilder(auth0, callback)
	.withTheme(customizedLockTheme)
	.build();
```

> We suggest you to add all the colors to the `color.xml` resource file, and all text to the `strings.xml` file.

### Available Options

Besides the header's `Title`, you can modify:

#### i. Header
You can modify the header's color, logo, and text with: 

```java
.withHeaderTitle(R.string.app_name)
.withHeaderTitleColor(R.color.headerTitleColor)
.withHeaderLogo(R.drawable.custom_logo)
```

#### ii. Primary Color
You can set the primary color, and the primary color for the dark theme with:

```java
.withPrimaryColor(R.color.colorPrimary)
.withDarkPrimaryColor(R.color.colorPrimaryDark)
```

