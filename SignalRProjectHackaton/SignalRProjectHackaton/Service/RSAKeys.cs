using System.Security.Cryptography;
using System.Text;

namespace SignalRProjectHackaton.Service
{
    public class RSAKeys
    {
        public string Encrypt(string data, RSAParameters key)
        {

            using (var rsa = new RSACryptoServiceProvider())
            {
                rsa.ImportParameters(key);
                var byteData = Encoding.UTF8.GetBytes(data);
                var encryptData = rsa.Encrypt(byteData, false);
                return Convert.ToBase64String(encryptData);
            }
        }

        public string Decrypt(string cipherText, RSAParameters key)
        {

            using (var rsa = new RSACryptoServiceProvider())
            {
                var cipherByteData = Convert.FromBase64String(cipherText);
                rsa.ImportParameters(key);

                var encryptData = rsa.Decrypt(cipherByteData, false);
                return Encoding.UTF8.GetString(encryptData);
            }
        }
    }
}
