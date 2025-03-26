using System.Text;
using Org.BouncyCastle;
class Program
{
    static void Main(string[] args)
    {
        // Example usage of VerifyDilithium function
        string message = "Hello, World!";
        string base64Signature = "base64SignatureHere";
        string base64EncodedPublicKey = "base64EncodedPublicKeyHere";

        VerifyDilithium(message, base64Signature, base64EncodedPublicKey);
    }

    static void VerifyDilithium(string message, string base64Signature, string base64EncodedPublicKey)
    {
        // Convert the message to a byte array (assuming it's in ASCII or UTF-8)
        byte[] messageBytes = Encoding.UTF8.GetBytes(message);

        // Import the public key
        DilithiumPublicKeyParameters pubKey = new DilithiumPublicKeyParameters(DilithiumParameters.Dilithium3, Convert.FromBase64String(base64EncodedPublicKey));

        // Convert the base64-encoded signature to a byte array
        byte[] signatureBytes = Convert.FromBase64String(base64Signature);

        // Create the Dilithium verifier object
        var verifier = new DilithiumSigner();

        // Initialize the verifier with the public key and specify that we are verifying
        verifier.Init(false, pubKey);

        // Check if the signature verifies
        bool isVerified = verifier.VerifySignature(messageBytes, signatureBytes);

        if (isVerified)
        {
            Console.WriteLine("Signature is valid.");
        }
        else
        {
            Console.WriteLine("Signature is invalid.");
        }
    }
}
