---
name: Profile.razor
language: csharp
---

```csharp
@page "/Profile"
@attribute [Authorize]

<PageTitle>Profile</PageTitle>

<div class="row">
    <div class="col-md-12">
        <div class="row">
            <h2>Profile</h2>
            <div class="col-md-4">
                <h3>@Username</h3>
            </div>
        </div>
    </div>
</div>

@code {
    [CascadingParameter]
    public Task<AuthenticationState> AuthenticationStateTask { get; set; }
    private string Username = "";

    protected override async Task OnInitializedAsync()
    {
        var state = await AuthenticationStateTask;

        Username = state.User.Identity.Name ?? string.Empty;

        await base.OnInitializedAsync();
    }
}
```