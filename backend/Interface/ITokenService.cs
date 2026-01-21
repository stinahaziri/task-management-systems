using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models.Entities;

namespace backend.Interface
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}