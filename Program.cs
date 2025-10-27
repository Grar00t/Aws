using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/healthz", () => Results.Ok(new { status = "ok" }));
app.MapGet("/pricing", () =>
{
    var path = "/etc/gra/pricing.yaml";
    var yaml = System.IO.File.ReadAllText(path);
    return Results.Text(yaml, "text/yaml");
});

app.Run();
