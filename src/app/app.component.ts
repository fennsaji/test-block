import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment.prod';
import { Component } from "@angular/core";
import * as JsEncryptModule from "jsencrypt";
import * as cryptoJS from 'crypto-browserify';
import pako from "pako";
import * as keypair from 'keypair';
// import * as sjcl from 'sjcl';

declare let openpgp: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "supplychain-fe";
  jsonData = {
    content: "f166657e12ac9f3d49a5ac",
    tag: "Úe1´*{Ò\u001cÅ \r{}{!",
    iv: "ÿû|bb<Ã\u001a8ß",
    password:
      "\u0007â«&è`L^»-\u000b5ô¼Iü\u001d]ØE\u0010¯5·é\u0006 \u001a*\u0000\"A=³o\u0007YÃI6Ä\u0005erõsðø\u0006;qó>Lì»Ð©±-æF\u0007Ñ\u001dgÐðìÂ«;Ìäkç\u0019»#9?\u0002fsÜ/\u0015\u000e\u0000?ÃN{\u000fHÎå\u0010ó£z\u0002eëº\u0014©\u0014\u0001ÑÖD YãË9\u0018>¡\u0001'ï¦Ù'\r÷\u001cê¼D©Z·OÛÀ´F\u0007ÕbÔwº\u0012·âÓàë\u0005ò3Ô\u0005ëÜKÔ\tÇ§\\Ý©\u0002X\u0018<h/3\u0004[\u0006tø;þ¹ÍH£èx¾/&MH#O\u0016Äì&Ü\f\u0014pìßýÛ$¢«\u0018¸ë\\ìRG@´¾íAóÿ{lN",
    privateKey: {
      content:
        "dc9738737652f6aaf2af47c6e3ea103e7a75d1ed785724c81523bdf660c613e3b3ce32d94d61b8cdfc721f4531baad39e636776b6493b113cbd502df9a4e10d5bcc2a6951f99ab6231bd76988c1d62f316f84f48c48e26355eea985857b86965cba9bf13d86db5739ca53ccba1f8a3903be05a5b76eb2b613c5d105f4482e353002eaebf0bba2db29c85d14b85538a838404cb1fbe2dcd7453b86da18713178128c9cd66aff91f9311aa5a3430e85f288fbcb0652859dc3eb3b868965616acdaa9e440e3c63073ceb175b6b3b90de52bfc0c98be2d201041b9a8e8f8e3d2b2a053ed4314a970b37bb44c49ccb07e8186f9b919e14d33e0ca224e4cd33e8d32bff7f178007f1343752fb32d11d3a99afda42e38e2d9a30a6a3dfc2b07294e065d93784329720aa437b5ebcce7198d1dab091be5ca095a5af78dbdf20672c0b7059b6da02f75211aee489da9a832f6e7932da7f808e8ba6f32c970d42367f8bec26b498e22ff6248abeae8f1626f268b80d139a77f3ac2b7042e2aee3ad91852146c612de5d98f910f0a7e9e5b888c87712aa072daff3ac4567929ab3bb5ad5efa58d23aef67d6765d6769fe8f68b7ee369c328f85c3d9e62d760b7039ac7335cde92fc7b9be9a4dbb8e0506ef5276b4c32a3d1af15d11385eb927821ef8742b6891b243c7fdf81e2332fa778066f67ef9f961a99ba551c14e5d9ccf40dafdafed957e2a3be2b38a09d2ed356c1baea5e584daf8b0840eabac289f1da0c78b52095e2b22f9f9dd28a816a15ae0ca32fc58a7116b382cabb7a3e907cc625ba7883b92fd081d3133706f3afc58121f81235f43de662f2c13d48e831b95c82dcc651ff89378230a8fa5c2f165e0e47c9b1deb5d17dd9732a8483ab3eaaa537b97984bf472e2db603b0159814d49cd7f5739a961fc88aee1b1001919af418462e778c59c45d7bc82f9049fbcf0c4b2844fe2e793c95195907c9025859d78c849112549123a6c816440cb39136856e8ed373637978288dd903fce13d4f6e592f477a1437e8a2508facdfc26101b6fb28bc2ce01c6a2c7634d6e1b49302b6931904894071b7e1758b587074abe5840d5bda80115337becf2d811796d97fae4d261c720e215efdedb7a03b76c6f9a57bd33950ea4a2b4e2ddcc8ed083516b84886462a7659a37afcdfe73fae6458eaa1546497435e3c51ef601be62b422517634a3b5508d9e05e49027e19ceb100f916364bc3a0cc1237e106a0b85f690b0cfc912edd852aa548f114101faa28276688795ed525ab144e8036188100dbafd85fc0e2984d2ae96119562468cd1f901fa4502f878f7a6c36fbaa09cca513bbe9afb24bfa8a7e0e25d8e3e3c614809b1fb2e4950abfa0cf5a7a5dfcbc8b7a472b613f62c4620449940df2d9147396822efd87dc884d4a08a70538d6ce1b64ea8ea4755a0cc51f376a140e1eabe0388656bb8cb9b93f493f95b00c79eba6e4041940b3f498a0dca20eccb111d3ae6bc75633d0e6803bd261bdc03cca60d9c150f7dd65724996b1376c35b6335c8eca0b72bdee0f79abc6323cbe3bf7839682bf3af7239464f7864a6ca23ecd612c3369c2e68adcf2980415b6961e023b7bc4c344d183a317af0fa0315260fce6707830788fe367b7565b2094db40718b4bbcbb14df748c9ba306d2b0d04ff30478ae4fccce9d1b2f082675d2de67ff50bc79769b54bde5b2d256dc841ba1602578151dd9af873fbbad002a471d052cf5720a1c6d04dbab399ff472c6552f9dece2180193ab6160a5946495b6d9f7750f23bab50effaa35d5beb320280cc11b93615608123d4f97f19f69b9c3976a2ceb5e493828bcd27045068e827a7cf9e6a33c2eee1a24f2f290db7a362125fc98db0f35f40e5a368c7677c28f12b266f0763f5a7187c3ea8fb3af6b32bf062a8254d4afe7739d7ceaac057dff0e8e7f8c7b985dae0819d704219c65d74746c55548f470070fca7531ca5acb4e0aef54a6483d1cf6d83d684e8affc7661e4685b36355d11778f2b2d6e217fa869f8bdc09dfca330e879e1270bfe0fc2874a6fc5ce0087b134456e56111d5a6d1c05bf237d551e2c8f9ac9fcf3de601891f5f7cd05c2cb036c76b8b88a1a2d6133773438af5acc5748b9b5b99224c247f5fd215033f292be956a5808ec812f5b928ecb786239356c54db1427c0abe6153bf5fffa4bd7debe45357498386b2153fd65449491121160657c93af100868fdba1a3f910de770f4745ffd7f9263064754ff71127fa842b111e440e18a59a642d23df9250b9669a01acd7a9a39972a82b4ad001f92aac166fa2fd0fdfbfc41f7c0bb22ec581048a09a3674a92792633461419dcc36d387f822f2e35a207a41b1cc03b15fe74e4156ff1576da8482b548c11a5857438e6825ff795c2ef32296125800d7305e9ca0d41994a9aed3c1ef92b969c9354e400987d518fe10a529c74c32f2a4643854d36bee6842f5d469a6017cd3cd6b0f65f96757199dff23c87f9968e9a2143a71",
      tag: "Ër\u0014¥£~õXù[\u001bÓÉhä"
    }
  };

  // publicKey = `-----BEGIN PUBLIC KEY-----
  // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwSLnQ5fXFXz/HSGW6pFuQNvjlKEvqTEncSEiTB6KgrNHKxQJJkJskDxpNv+Cd9lSyRrRDeh7n2CpnhSkRPvvCC7nQtd9VApCN/7JV/zT23GWiEJmpR4Nu5CyFp5gjVeabY9cjM6NdzOUAGzcuyuZ4SKIfNXgB2tWrFC5ynZxc/z9SXcGK5LAxsaSK5yi3Yi4gFgEXzAHSs+neLKl4KqlU/6ri50pSLKHdTeW+jpc0G6p6YffTFT+F06cNFnjQOCNEUrqDsgDu/b0v8KXNnQ5Cc9F4C39ExWjM358qFx8J9ktybrZm8plvx00Plq0BI8qcc9GcDUpOt4tWRSNlKe4zwIDAQAB
  // -----END PUBLIC KEY-----
  //   `;

  // publicKey = `-----BEGIN PUBLIC KEY-----
  // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmIuPuaqaHo5z21xA4YpjgkbPz+2BYKEZ1SwSRmwjBDpSXAPtFHZHeF61qHLgCEf1xfYCHSkV0Di8bU8djFuf+yMPAgRboj6ijdWgh9ywNDYfYyx7m+GNr3+hPyD2jkLVpKC+OxXuAoLQz0lfIW5WMuSqbuttU/RiBzu20EVWzDTpP0HWkGgh9P4nVDPqU+sLtCeW9qx04rjPAVIw6DbtXG6veVtgWn1WSpOOo9dBAw5qf+l7tLlPYdxy+U4tMhrRLbXK4JRUz8/BkLUSxRzRonz7QS0LnQgCl8PDWkUmoj7HEZcc42yj0G4RKaxkDFa8PogkA8+qjFbcMeiOPosV/wIDAQAB
  // -----END PUBLIC KEY-----`
  

//   privateKey = `-----BEGIN PRIVATE KEY-----
//   MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdptIHFuE3+Pa+g1PWJ7NPCSh4IOqfW23nCUpaeZQpTVn7Ea6Gasy2+tEmbiSxZdWkTCQcCCmGlqMWdRifcuoNqdjNuS9oLyp9N5BYgTN5C6y9ZzUX8K01jcSN6syxJ9j7xrJ6JXUjmIyleDEdJKOGDOJ9LTSL9ogXIcobIabpiapZktTU3LNrUrGkyOEeMkk46Da7CuCwoTQR1ZgsG9OtCYHxdCJglK2Bl+1vrbiUe0EgYD191wr2X5+NZHFhUDPGGXmuZ+sZI2qPbSUy3GjHmUMdLorwT/uNaAi81UGlW60DWOcMp0umQfajlyzV6cGKQdTPeISnEG0752hnyekvAgMBAAECggEAAsoFCPbOqYMdBRlP1qobAxSN3WeNA1w1Z7D/L8Mfa+y1nPYv6//PLk+yv0+Ti/INA29iOG3OrCLmqEin7lToADomXv1iaVRjwnNeimWDCxV1hsZyAGyPgcyln7a+IfEI71HNJXwTGarrYyhznGSmWZNz+yc7MFyX9FDQdLDTuYvYdC5Jg6KmE0mM3ckquiGUhQQ5wiLw+volTqM+0oGwRH6ibaYKPzemvUhbrZCvX4uKn6P76d6uK+0K4Bir66rzz0YYNyx/BRFlTqFcwJyN8XxQa/Rn5zM1jHPSKoIAS/f6qG0T3BH5hpHyQiYx7NeZhngOUNP0rIjbGZcFoduOAQKBgQDMbEpJCrcw45VYebc5+iaaz8uL2ZLWfOJ1Kd8Ew1C6W92wrouooiyF1sEQetvaZM7HFlqtYu2SD46V6Pu+qkvKMxvmImceMfsLRPb6vrDmblIeN3MGLRY1UZQEqhMwEECDk5KLSlzZZznXKWWtn7/dzt42/EyCQC7bKCS4W9DEkQKBgQDFbY+1STo12zFrzWquLzkyfRVm05iPBMbtAs6g+f2XmT6K9TQ3HG1vHX8oqRT1NyfCOiNG3TlrQV4FF7uJA3Qo5/FTJioPcU+IB0gVSwU0W0CZiJT8MdE4D14YOaOoSVQa+yNDXZ3+m6UkskMz4lakzloU6nT6/ic+ozBfMK+xvwKBgQCee8In2KfnvjlVy59y0m5FjZ4XwUmnAlErVpfxgF9A6+H2jYv25CwyYylw1l9GdOsezETmsZDPsUHxFRy/WBXEIFWb2MYrUcJ4nTIBef951sPRa1nAywmxsppX92dC1wa9O5bcaH2Niwr7tbt/nR9KHoyHAplqTcpF3FyDlaNIEQKBgCNW2Dl4ER5gzPjh/S2OsGtULoeIaq93CHCWZwwzk2wWdzaCa8VNpl0UZ5WMpn66T7iZlYTyxntnaP/6XoxI/PrxgaYDl9XJz5Wm0AVXt2fGycpxw1FdTXj+bzZg4uWVsqNdvtMpJ8XScH4gFp1r71xyv3cs/KGM6tNwfJEdcuWbAoGBAMcm2RghU4QK/oMS6iDS7KRH2M8eHD2WUl7WfJE8NvoKKAC5eB4SsESV4g4m/uXuh/obDtKjWHW8z0aZnhsp71uWVmXAkneeP9MwHGYAzAAuq0uALs7YeVpMpx1yYxDRGU7/EC1PY5F+jOXJM/BU9p3iQAhISTE6bj6gknTW0xyA
//   -----END PRIVATE KEY-----
// `;

// privateKey=`-----BEGIN RSA PRIVATE KEY-----
// MIIEpAIBAAKCAQEAr1lZsI2+CJ2IGC+83EWC4+lrhTiPEK6VcAP0yd+GjS06mR+b
// /Zd3cO7k4QtVxNCueRK1kb75C3oLDe2k6J407GepkwX1Qd2Fzd2V3r4Hm8DuTNl/
// XBdXBtmKdFS9kwk+H8z1pVET0BuDPeH+el4RVc1PekaCOZC7R0vhi9o8iZg01r2j
// YXtA99ecPyYF7UzhKK5p7kib2BeuMwCmG5d6rXriWYA8KRaKm/icYUiy1Uu5kW1t
// y1IiC1jMqX3/L6hg85UVAqV0nkTG5qH7NjPRRKqumnL30IIuVdoH1+dEYlEYVv9G
// 2MP6JJbyaNzWIHuYlV5S/jlTC8/cSVFzmyhsxwIDAQABAoIBAQCDSEdRW14a/y7E
// xQEGffiYgMuia40ZdUynGB8vAW6wxlsoB7V3sO6ZHBM6tozZlU/7j9lnLG8ze4VJ
// QVKFYuXG1XntfLl6PcuPLUanBOmXYGRKH1Eudr8OftMdc9CXhIUBtCd6RXCrD947
// 97bakREzh0rpBl87kDPXFmXgml1WuePrcoazYTrH2QT51CnB9c1qXC3wvbRL0fHm
// jCbbFOum8jth9Wl9IbcjlX2V3k7H2HsFjbCm8a+INxqZmQOgKTgeRAtG7SCN6W9N
// yz3u2Eoybv80lOAGDGW09dOPK3NUhB5woqVx9qzrkTysE94RHc4y8ERo39d58Waw
// /+6g8uLJAoGBANtPrCSojicHunOMME6GPmi4RhOtcKrU7yzo7ohTXIooLj7Pa6u3
// McYTZJ0rhuKpnIdvYSACSWZFv2EreUOM7s6AqEuLFfw4zS5bMgigV/VRibcIKIQZ
// u0IjyhgTms9NnDUI7AwfgqSmBJg9cL5HfkPYEHIVrhELKhKL0pzvgOTDAoGBAMyu
// 7oxjGd2KmydhPrBCZX5227ubJw/9ga55awHuQWe87BWwXHOsbmkbtEqdU86ayV3l
// YH7IjBFHlh5G5i3PtFvEvMopPZeB2tgx+kgw+ZELq5K/jQxjzaDS4mxCFXa8Jmr1
// H7wnEx/b1hks5VwB2kIgElC93VyMr/K5xbEzOYetAoGAOJLi60n38aWSuX/ubjM/
// IjB3E1hoegkX8dPcxJoMgy8+TsGfGtrVIi2ahNjXoNz0HhPjUCiG2rUfW2eljoFq
// kSarQ2GLuFbGxzCLRaJnTkdMaUTXfsxMfBFTbsaP5u40X5H/olj2kJarFMK0tMEo
// l0PDakqhbpAcuFANcqJt85UCgYBQIMtSOhmOGQzURcV8ywFgmLc8omiQYfW6j93M
// S7FfIx5o/zmyLvaqPyY9b4m3f/EEyR8Vgv0SZqvl/mtt07oPkt01Zx+tiDBcInSQ
// flu05JSuRj65cvi01Nm+97/fU5jWlk9uIP3jovQVtvWzJyaCbHu/EBTwfkMDCqbR
// z/PdoQKBgQDUEYVqLivcl80ITCkr9hlJdJmfYkbsXXZwkVrghijOOUK8Xe26VtGc
// GWJuD7qQ+z+tijIu+JBq/3eeQcrGwEZTscVyaB2Xo9uS+Z8gIuIZ99Xy8yJqR3gA
// j4DCb0mXpEfCE64oIrYJv4N8d5ksS1JPxWOYBqWvBMSAGc/q/HSCcw==
// -----END RSA PRIVATE KEY-----`

privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAgo/kJMu3ro0Q+NAWfxdCwmmY+gjK6KDG5WJJ/sDUNJh+YIGvlvyd7Ior
Ar6X0JRbrfbcCc2tmaQI7/FrDNA72p5xpCe3mS3ULAaMqO6oyHv1mOvZe/gI2w/lenZQq1dQ
hJLg/K8qR6flB6F2tx8JvhU3LzdlVuIP0lHvuXvSt7Q8FxYj1DYudcnPjlJeZn9NrN6Sh6BZ
qMeYCeEVt8OXut+UhG5/6/6bsjyyFc2jd5u7nRJeVPmfeiEuI6okaVKxP8Wks70H4pPVI37r
ZUCfSk5bHCAmVNwFu6D+Gv88dYJQsJYcnlvCtjbSriwOsc113AzD3hsO3DRoFI4aPaWC/wID
AQABAoIBAGjLCXknMgUeILM0gfn8N49Hpot5pzNUaJAQdgfNygV1KGpZbRApLrB+rcsEI2I8
0eEttKsBtQcOjEXaZevg70mnxtrVLh36lMPJdfjZpgtUw2m8U9GW4bTCa5QBhvofmPbv1Tm7
dpoQ/llDlb+hX/Z7nNF/Cw3TYJOVRG6CHj1nfCsE3dCj90z4IRS0eI+kqiUZc9GykIRkWoVI
+DWsL7QFMRMbpgZwmPGXZCJeSpnRYB6/N1sxdv7Y89jZZSb9Yv7sgWcoE5Ddj5y08XcN75X5
32O0rS7q99uCE+adD6Og40ttBNAEX1RXkQsoMl5xiGfDMP1+oMhdr4N8C1u1hRECgYEAxjSp
TPArJxygQNGsh1MsjRkHZ4kNygwamWRfLB0VW6qfpeLvOnPpjY8FfLK0DW53PTTtX8dTTeUd
56p6mBEkw4I3BB/F8IlwFqvwtYGi+zJwVbwSQWsgc5lzFQuHQ1aEllKEkeXgdxpC+CkOtIyU
jVc9esZM1QT0fl+tclcyfMMCgYEAqKHgomuIt6BqAyokTQtp6MIngOf6sEhZuG5XNFqpYXLf
5/jBEuc8Rj2IiHQmokokjW9ISZOwrxSM+yWjJxNXeKA2kSRxDswxiLUvZVv5GnFjfUsqeiEM
Gg8hmbW2LbKqLl6SuSxmx8aNNRicEJOjpq9dzKC1bHgwuDTHCwHxLRUCgYEAlfC8qrF9U6c6
LA7yP6VSLKNkkJSD0/d4H9ZokQynXaMkBvA4HbYWVrp9YiomP4rztV/WuwAlKuZKyziSaXt+
nlBhokMPELpICz6jaAvb6b/sb09JWCfcctcA0kjYWL6Yqsdd9qk6N5+sTeNxdnBq6Mm4fqqI
8RVAiGGE6tzAGtUCgYEAld/hrZlTVpi8//kJcGxPge5le70x4lE7ZJ605LQbTJ/zftFokCty
N59i5JwO5jhtSkL4hWQ9KS5jqqcl3YnkOTJzrQYtcZBsCeu2pyhaOnVCjk4q/4a1oceG/n0w
4GaluDaXwvpCkxXV1LX9pwIA9hlwjXjcJf6glmdZ7F+agY0CgYA9nDzi+dyYyfa3VVa0C8Wu
7gxoZRHMqCBW7t3DpuDeG9Tq25PrS6UjINvS9NFErY/rT/HMa6bUQyP4DvgXOoew0oHjsvfW
9cLokbjvLl4zeQIUK4CrhJcM5mygXb/E7KxhUTlXgeOoVnZahj5GC/4Go9CPLHk82bUxlBkx
4swuTQ==
-----END RSA PRIVATE KEY-----
`

publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAgo/kJMu3ro0Q+NAWfxdCwmmY+gjK6KDG5WJJ/sDUNJh+YIGvlvyd7IorAr6X
0JRbrfbcCc2tmaQI7/FrDNA72p5xpCe3mS3ULAaMqO6oyHv1mOvZe/gI2w/lenZQq1dQhJLg
/K8qR6flB6F2tx8JvhU3LzdlVuIP0lHvuXvSt7Q8FxYj1DYudcnPjlJeZn9NrN6Sh6BZqMeY
CeEVt8OXut+UhG5/6/6bsjyyFc2jd5u7nRJeVPmfeiEuI6okaVKxP8Wks70H4pPVI37rZUCf
Sk5bHCAmVNwFu6D+Gv88dYJQsJYcnlvCtjbSriwOsc113AzD3hsO3DRoFI4aPaWC/wIDAQAB
-----END RSA PUBLIC KEY-----
`

  constructor(private http: HttpClient) {
    // this.doSomething();
    this.doSomethingElse();
    this.doDownloadFile();
    // this.generateKey(); 
    var pair = keypair();
    console.log(pair);

  }

  doDownloadFile(){
    this.http.get('http://localhost:3000/getRecord')
      .subscribe(res => {
        
      })
  }

  encryptStringWithRsaPublicKey(toEncrypt, publicKey) {
    var buffer = Buffer.from(toEncrypt);
    console.log(buffer)
    var encrypted = cryptoJS.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
  };

  async doSomethingElse() {
    let key =`QQgTj8OELvoFpuFUp5J7X4XsHdnCD8ikLoG/wH9PzgxHo7YBAFmUAEEuXSyJloZrBGDlh+pSKxAj7HEJJxQ5i/44lAJRZN87o5K50WJA+w66uwY/oP9jUemd/CRznFoXn5BDpfUC8+3jchdSXNbAqygZwPkJ+JekLkDj/6JZRnvMOH1ty2+JYX7fRP85VnGq/2w1BqARq0Va5pUE3mCI9S39JUe4km7YCIb88jPDd7tN3qaTeUXhbIfe0YYP1rnaOpj8sqnwDcBVCSqocFfBJ2bSFSIuUEiXd2dImN/N3n6K9tPOD5CdvORNsOaUe4WApJYtzh+l9UqUhzG+MRLhvA==`;

    let data = encryptStringWithRsaPublicKey("Hello", this.publicKey)
    // var decrypt = new JsEncryptModule.JSEncrypt();
    // decrypt.setPrivateKey(this.privateKey);
    // let dPassoword = key.match(/.{2}/g).map(byte => parseInt(byte, 16));
    // var uncrypted = decrypt.decrypt(Buffer.from(dPassoword));

    // this.generateKey();
    // let privateKey = await this.importPrivateKey(this.privateKey);
    // let publicKey = await this.importPublicKey(this.publicKey);

    var buffer = Buffer.from(data, "base64");
    var decrypted = cryptoJS.privateDecrypt(this.privateKey, buffer);
    console.log(decrypted.toString("utf8"));

    // let dec = cryptoJS.privateDecrypt(this.privateKey, dPassoword);
    // console.log(dec);

    // console.log(privateKey, publicKey)

    // let ciphertext = await window.crypto.subtle.encrypt(
    //   {
    //     name: "RSA-OAEP"
    //   },
    //   publicKey,
    //   Buffer.from("encoded")
    // );

    // let decData = await crypto.subtle.decrypt(
    //   {
    //     name: "RSA-OAEP"
    //   },
    //   privateKey,
    //   Buffer.from(dPassoword)
    // );

    // var decrypt = new JsEncryptModule.JSEncrypt();
    // decrypt.setPrivateKey(privateKey);
    // var uncrypted = decrypt.decrypt(Buffer.from(dPassoword));

    // console.log(Buffer.from(uncrypted));

    // let data = '{"iv":"cQ8nUfRnAe62fYk031kPBg==","v":1,"iter":10000,"ks":128,"ts":64,"mode":"gcm","adata":"","cipher":"aes","salt":"AEvf5vDuwU4=","ct":"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","pw":"0e97db4469174c7c2214c21492e7a1e512fd45628c88d177a734919000416a747a2653c0bff9a070cdaf6cff0dff6697fa9c3d5aa9101894130d2c6deb7c8462f6fb594c5eefe18b15f573891dd8c1ba8d44d7b09c6186a693053a6ecd93459a2bbfd97823dc295d50a088ee5d446286cbdc1cdd1b6d636c695c14dcd64bd67efcb0d5a92cde57b94fb495ba35b0efa964582c5407cdc9a2ec366e1614e23192e45311dd798cfa61d88deffb6dc1e3fa5b309f5bd2b006fbca7ac708a180144224faed98a81a18e03fca436de66ba57111c307560d57d829ad935251f06321b9055d35732d1e18c41f3d22f5609377b4731a51e7642b7bf04261329cf186e857"}'
    // let newData = JSON.parse(data);
    // let decKey = newData.pw.match(/.{2}/g).map(byte => parseInt(byte, 16));
    // console.log(decKey)


    // let keyDecrypter = new NodeRsa(this.privateKey, 'pkcs8-private-pem');
    // keyDecrypter.setOptions({encryptionScheme: 'pkcs1', environment: 'browser'});
    // let decpassword = keyDecrypter.decrypt(Buffer.from(dPassoword));
    // console.log(Buffer.from(decpassword))


    // console.log(Buffer.from(decpassword).toString())

    // console.log(decpassword, sjcl.decrypt(Buffer.from(decpassword).toString(), JSON.stringify(newData)))

    // console.log(decrypted)

    // let iv = '69c11a17f80ea42611653460';
    // let content = '26bd46f79565e5b2b64207';
    // let tag = '404b72eb7bfd179bf00d317ced0552ec';

    // const ivH = iv.match(/.{2}/g).map(byte => parseInt(byte, 16));
    // const tagH = tag.match(/.{2}/g).map(byte => parseInt(byte, 16));

    // crypto.subtle.generateKey(
    //   {
    //       name: "AES-GCM",
    //       length: 256,
    //   },
    //   true,
    //   ["encrypt", "decrypt"]
    // ).then(async (key) => {
    // let iv = window.crypto.getRandomValues(new Uint8Array(12));
    // let ciphertext = await window.crypto.subtle.encrypt(
    //   {
    //     name: "AES-GCM",
    //     iv: Buffer.from(ivH),
    //     tagLength: 128
    //   },
    //   aesKey,
    //   Buffer.from('Hello World')
    // );
    // // iv = window.crypto.getRandomValues(new Uint8Array(12));
    // // key = await crypto.subtle.generateKey(
    // //   {
    // //       name: "AES-GCM",
    // //       length: 256,
    // //   },
    // //   true,
    // //   ["encrypt", "decrypt"]
    // // )

    // let decryptedas = await window.crypto.subtle.decrypt(
    //   {
    //     name: "AES-GCM",
    //     iv: Buffer.from(ivH),
    //     tagLength: 128
    //   },
    //   aesKey,
    //   ciphertext
    // );
    // console.log(Buffer.from(ciphertext), Buffer.from(decryptedas).toString())
    // });

    // let aesKey = await crypto.subtle.importKey(
    //   "raw",
    //   // decpassword,
    //   Buffer.from('passwordpasswordpasswordpassword'),
    //   "AES-GCM",
    //   true,
    //   ["decrypt"]
    // )
    // console.log(aesKey)

    // console.log(Buffer.from(ivH), Buffer.from(tagH), Buffer.concat([Buffer.from(content), Buffer.from(tagH)]))

    // let decrypted = await window.crypto.subtle.decrypt(
    //   {
    //     name: "AES-GCM",
    //     iv: Buffer.from(ivH),
    //     tagLength: 128
    //   },
    //   aesKey,
    //   Buffer.concat([Buffer.from(content), Buffer.from(tagH)])
    // );
  }

  importPublicKey(pem) {
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PUBLIC KEY-----\n";
    const pemFooter = "-----END PUBLIC KEY----";
    const pemContents = pem.substring(
      pemHeader.length + 2,
      pem.length - pemFooter.length - 5
    );
    // base64 decode the string to get the binary data
    console.log(pemContents)
    const binaryDerString = atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = this.str2ab(binaryDerString);

    return window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      true,
      ["encrypt"]
    );
  }

  importPrivateKey(pem) {
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pem.substring(
      pemHeader.length + 1,
      pem.length - pemFooter.length - 1
    );
    console.log(pemContents)

    // base64 decode the string to get the binary data
    const binaryDerString = atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = this.str2ab(binaryDerString);

    return crypto.subtle.importKey(
      "pkcs8",
      binaryDer,
      <any>{
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: "SHA-256"
      },
      true,
      ["decrypt"]
    );
  }

  // ab2str(buf) {
  //   return String.fromCharCode.apply(null, new Uint8Array(buf));
  // }

  async generateKey() {
    let keyPair = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048, // can be 1024, 2048 or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: "SHA-256" } // or SHA-512
      },
      true,
      ["encrypt", "decrypt"]
    );
    let publicKey = await this.exportCryptoKeyPublic(keyPair.publicKey);
    let privateKey = await this.exportCryptoKeyPrivate(keyPair.privateKey);
    console.log(publicKey, privateKey)
  }

  async exportCryptoKeyPrivate(key) {
    const exported = await window.crypto.subtle.exportKey("pkcs8", key);
    const exportedAsString = this.ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
    return pemExported;
  }

  async exportCryptoKeyPublic(key) {
    const exported = await window.crypto.subtle.exportKey("spki", key);
    const exportedAsString = this.ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
    return pemExported;
  }

  arrayBufferToBase64(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    var byteString = "";
    for (var i = 0; i < byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i]);
    }
    var b64 = window.btoa(byteString);

    return b64;
  }

  addNewLines(str) {
    var finalString = "";
    while (str.length > 0) {
      finalString += str.substring(0, 64) + "\n";
      str = str.substring(64);
    }

    return finalString;
  }

  async doSomething() {
    console.time("chat");
    let text = "你好";
    // let text = `kUBNaDDK28oOv2dNWA5ofdUR2m7ncd9nWOTvn5YwXEbM7BQDv4jb2EyJiwwLwS8IScsCv3rcogoT4p9KpoSoL1Blt3Ru5Vf7idGoClE4uD7RbEs8xlNU02qJfaQV3p74mso74Hp7pSeAOWHPWoiRR0wRNJTkQLnOTycB0g2YgprCU1s5ML5bWSRYfFk3iNCubvL3yK6y7efwM09ozbYSOHuIq1ow8Ht0YIOZoJwd4DlMMA7PPLmYnXrY0zslBYpG5oFvNnTxu6Lr8fEXFDlwtf9JupMknsN89JqKUMB1qNLLdj2plyllVIoYgk7x1yVOO4VXrLimvxIOoTG0oqogUzhDhHBftfyN6f4SiNP3wlkIfNS3qspXp8xm6HaHyvs78kDe7iVEcOwheDCZBu7T8lAP7LWbFgWupPjomVdlYEPRWyKNcf89YJDk9deDM69uAi1vX3ssrgcq4sLLPDCjqDSEeEoyFYanwaRr4gONTNU4BRs5YhK4mPpPEatTsOabPSZbbDNqzrOA2yrf7o6Qpqjw4ME0ZF0YaP90RDH66eMAAFmqoreKGKzvlEQWgkHxfOqNLDnGjLQEm2nx7qT7YhMuxQBWdjdABEocFm0hwpybJTvZcbtiXpKZ40rOQspW7ixnqbdEVaqzcnf8xb5UxlcdKlQ5aDLw0miyhLWTsTtoA7SPcQmDjx7M26rAMfkFwnZGkqh5MypTqhkJKfFBz5yxjrZBgkisWv8NLTMcz0yJjY7C22zkZcMwZLPynWOL2LuNbPojuscZEKprsXfsbiXd4RU2iIg7o3kt9cWIfTDKzO4CHaHP55YHsK7lelVv3FmUqhtzlDRvelMcFHHbcyldcQ1k1WNw05O3Uo8s9f4ZiJsDhJe2FnOD6l8rVNCulkU4KmnemCKZ4y9lDbmxu6hP5r8PXLLvqSBcEUHeKKJDVpddaP15t4yABq7sDL32H0x9I2fxGRSBMXpCG5eQvAXUVGucBEiPpIqJdZUwc7eb4wLsJQMpehEA2KyTTvVt`
    console.log(text.length);
    let text3 = Buffer.from(text, "utf8");
    let compressedData = pako.gzip(text3, { level: 5, memLevel: 5 });
    let iv = crypto.getRandomValues(new Uint8Array(12));

    let rawKey = crypto.getRandomValues(new Uint8Array(32));
    let aesKey = await crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, [
      "encrypt",
      "decrypt"
    ]);

    let data;
    try {
      data = await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        aesKey,
        compressedData
      );
    } catch (err) {
      console.log(err, "Error Occured");
      throw new Error();
    }

    let key;
    try {
      key = await crypto.subtle.exportKey("jwk", aesKey);
    } catch (err) {
      throw new Error();
    }
    console.log(new File([data], "ada").size, key);

    let publicKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu2FkoaqUnRXqlSP9BxBv
    1L8j0SVNyK7l+9Bh1daUIYe6i0N342mlrp1HbBFZyCWBFwBvfvUFT9o+jyb3v7a3
    KVLIrlmlgnNTQ5pBupm+BhJKBp5ENT79WBKVOCmBsKEh8SJUBPkDg77emChyyzgm
    dVCccocsFkQyzBN0qnMGJRKACtyK/h1HtTFmcD4M25YR9wzz/B70aCJUF6+ADnhc
    wqWBFGNDaVHE422e+XecBn+jmsRtyFiZb8pJH23fwkrrM6iITNBqvcu3IJgwhpmT
    YZenFMwwl+NdavAIsrvR61AgQ+4TaF3twpunQqQqxUCJLDuZhFQYOanpLxpVrVwH
    gQIDAQAB
    -----END PUBLIC KEY-----
    `;

    var encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(publicKey);
    var encPassword = encrypt.encrypt(key.k);
    console.log(iv, Buffer.from(data), Buffer.from(encPassword, "utf8"));

    let buffer = this.joinIvAndData(
      iv,
      Buffer.from(data),
      Buffer.from(encPassword, "utf8")
    );
    // console.log(buffer)
    // let buffString = buffer.toString();
    // console.log(buffString)
    // console.log(Buffer.from(buffString, 'utf8'))
    let bufString = this.ab2str(buffer);
    console.log(bufString, this.str2ab(bufString));

    let { ivnew, datanew, password } = this.separateIvFromData(
      Buffer.from(this.str2ab(bufString))
    );
    console.log(ivnew, datanew, password);
    console.timeEnd("chat");
    console.time("chat-d");

    let privateKey = `-----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEAu2FkoaqUnRXqlSP9BxBv1L8j0SVNyK7l+9Bh1daUIYe6i0N3
    42mlrp1HbBFZyCWBFwBvfvUFT9o+jyb3v7a3KVLIrlmlgnNTQ5pBupm+BhJKBp5E
    NT79WBKVOCmBsKEh8SJUBPkDg77emChyyzgmdVCccocsFkQyzBN0qnMGJRKACtyK
    /h1HtTFmcD4M25YR9wzz/B70aCJUF6+ADnhcwqWBFGNDaVHE422e+XecBn+jmsRt
    yFiZb8pJH23fwkrrM6iITNBqvcu3IJgwhpmTYZenFMwwl+NdavAIsrvR61AgQ+4T
    aF3twpunQqQqxUCJLDuZhFQYOanpLxpVrVwHgQIDAQABAoIBAQCZfmWFvQsyRsK7
    2xgpkkBZgR3g9HLsYsEIbyHFnpoHgXzBGcp6oo9TI4lfMDNgrcA6TGQJFsN8LyYx
    89Tc2dreYe78S3k2DCx340PWjJxJsu+qzjjHeUrku4w6zl1riAMa2WkEDcvgPxlu
    gSvP5rYyQY92jd4Ce2k1HPbjrYeqEz+f/ShymwTXXHp2LTg8QIhNlAANpambVhcd
    MXb7MdZySx1WgvNtr9IyXcJUhdhGbGCSD1bwy3xAKUY5Ip3w1UQgNKbturQlkHNM
    lj7BscadbZiUCjFry9SH6381J4/kxRTdRAqPA0Lyq0wgt/eA/FsuUygXBnQPtEcl
    5iqdBaPlAoGBAN/qG9thNPSckahrisaCD3m79GpJsfQwON3itZ+M11Jo3E2mmF+x
    2gTlUo9SnQLGVrHT0Knz2/M0kNjHjkUlUXCQDtFTQGL5yTfZELOF1MOGCyEWNIyL
    CMttOzYXI1H0oYP8LtjVoGCatjfF6j+/i8+OLGpffG0tZl5inBqSv2CbAoGBANY7
    GZkycn8FtxNeHfWznUzElNnlcPA/npCMDoTsTqzDLFOfiWhxEEhJX3GWSX9GZ1Td
    nhpDpkTjQGO6fOxOU2K49bpqeqJooIXnGz7DmtBUJ33xMGPLQGWAaFgNghK24P8t
    sSmSssi/s7vZztsRIdCG71ogd5OYa26O/dNTL1QTAoGAYfYKOfBNOrdFAmoKTM6Z
    9qhERjv3nt16A5kr3KHBkkxOFarM/xDQUVQCyrFZ/9zGEQaaQ8BsefqFZFHp7FZn
    Ste7o9jIUoT1g3lz1Ra3/tKmC9OrKdGqB1XCkeeNjE16XEP4OuU7RQhqr/vmf/1N
    LYEF7YPY6+rw3lpF8VpCYAECgYADQlDoYLkXL5oSZFsmUr4w3ci56+Ck9wLNhiPu
    Z73mqO1ytDmd6iJqRxt5meSyV/rYcqqmEaNk5uQi4EJoQeTI2rF6TYZiFB9lChgD
    A2zGgJE9PD8VNZFcOfDcbhAtgrS3jRVl4YJwxWHRmMWp1X/jMTpQ76+CAk6YFvrL
    jTdqGwKBgD1UgBezyh/x6CM2QoadiATDdCnMTRxGiqENDS5TEEh2w2Xy0LcpPSNT
    Nd5j2ozzLN5ZMErq0D0jEHMoYj/dmg5AmyKEHeSdm2/qg4lMKYCkWib+WKuGnJLL
    3zgWSk7n42Bq8w/Zm48o1zSMV8fzMyoCj+eVozACYCnJ8gQquyCO
    -----END RSA PRIVATE KEY-----
    `;
    var decrypt = new JsEncryptModule.JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    // var uncrypted = decrypt.decrypt(Buffer.from(password).toString());
    var uncrypted;

    console.log(uncrypted);

    try {
      let key1 = await crypto.subtle.importKey(
        "jwk",
        {
          alg: "A256GCM",
          k: Buffer.from(uncrypted).toString(),
          ext: true,
          key_ops: ["decrypt"],
          kty: "oct"
        },
        "AES-GCM",
        true,
        ["decrypt"]
      );
      let data12 =
        '{"content":"f7a23734ce42ce7b4de4ae","tag":{"type":"Buffer","data":[119,236,209,144,73,130,201,138,101,69,59,217,243,223,149,58]}}';
      let data2 = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: ivnew,
          tagLength: 128
        },
        key1,
        Buffer.from(data12)
      );
      console.log(data2);
      let data3 = pako.ungzip(data2);
      console.log(Buffer.from(data3).toString());
      console.timeEnd("chat-d");
    } catch (err) {
      console.log(err, "Error Occured 2");
      throw new Error();
    }
  }

  // importPrivateKey() {
  //   let pem = this.privateKey;
  //   // fetch the part of the PEM string between header and footer
  //   const pemHeader = "-----BEGIN RSA PRIVATE KEY-----";
  //   const pemFooter = "-----END RSA PRIVATE KEY-----";
  //   const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length - 1);
  //   // base64 decode the string to get the binary data
  //   console.log(pemContents)
  //   const binaryDerString = atob(pemContents);
  //   // convert from a binary string to an ArrayBuffer
  //   const binaryDer = this.str2ab(binaryDerString);

  //   return window.crypto.subtle.importKey(
  //     "pkcs8",
  //     binaryDer,
  //     <any>{
  //       name: "RSA-OAEP",
  //       modulusLength: 2048,
  //       publicExponent: new Uint8Array([1, 0, 1]),
  //       hash: "SHA-256",
  //     },
  //     true,
  //     ["decrypt"]
  //   );
  // }

  joinIvAndData(iv, data, password) {
    var buf = new Uint8Array(iv.length + data.length + password.length);
    console.log(iv.length, password.length, 12 + 344, data.length);
    Array.prototype.forEach.call(iv, (byte, i) => {
      buf[i] = byte;
    });
    Array.prototype.forEach.call(password, (byte, i) => {
      buf[12 + i] = byte;
    });
    Array.prototype.forEach.call(data, (byte, i) => {
      buf[12 + password.length + i] = byte;
    });
    return buf;
  }

  separateIvFromData(buf) {
    let ivLen = 12;
    let passwordLen = 344;
    var iv = new Uint8Array(ivLen);
    let password = new Uint8Array(passwordLen);
    var data = new Uint8Array(buf.length - ivLen - passwordLen);
    Array.prototype.forEach.call(buf, (byte, i) => {
      if (i < ivLen) {
        iv[i] = byte;
      } else if (i < ivLen + passwordLen) {
        password[i - ivLen] = byte;
      } else {
        data[i - ivLen - passwordLen] = byte;
      }
    });
    return { ivnew: iv, datanew: data, password };
  }

  str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }
}
