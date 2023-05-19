using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;

// GA KEPAKE
namespace API.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        [HttpPost]
        [AllowAnonymous]
        public IActionResult SendEmail(string body){
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("florian.dubuque@ethereal.email"));
            email.To.Add(MailboxAddress.Parse("florian.dubuque@ethereal.email"));
            email.Subject = "tes subject";
            email.Body = new TextPart(TextFormat.Html) { Text = body};

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.ehtereal.email", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("florian.dubuque@ethereal.email","J3kAmHfsUaKHfCVaXy");
            smtp.Send(email);
            smtp.Disconnect(true);

            return Ok();
        }
    }
    
}