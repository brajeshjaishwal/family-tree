using System;
using System.Collections.Generic;
using System.Linq;
using Server.Net.data;
using Server.Net.Entities;
using Server.Net.Helpers;

namespace Server.Net.Services
{
    public interface IFamilyService
    {
        Member AddMember(Member member);
        IEnumerable<Member> GetMembers(int parentid);
        Member Update(Member member);
        void Delete(int id);
    }

    public class FamilyService : IFamilyService
    {
        private DataContext _context;

        public FamilyService(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<Member> GetMembers(int parentid)
        {
            return _context.Members.Where(m => m.parent == parentid).ToList();
        }
        public Member AddMember(Member member)
        {
            // validation
            if (string.IsNullOrWhiteSpace(member.name) || string.IsNullOrWhiteSpace(member.relation))
                throw new AppException("Member name is missing");

            if (string.IsNullOrWhiteSpace(member.relation))
                throw new AppException("Member relation is missing");

            if (_context.Members.Any(x => x.name == member.name))
                throw new AppException("Member \"" + member.name + "\" already exist.");

            _context.Members.Add(member);
            _context.SaveChanges();

            return member;
        }
        public Member Update(Member memberParam)
        {
            var member = _context.Members.Find(memberParam.Id);

            if (member == null)
                throw new AppException("Member not found");

            if (memberParam.name != member.name)
            {
                // member name has changed so check whether new member already exist
                if (_context.Members.Any(x => x.name == memberParam.name))
                    throw new AppException("Member " + memberParam.name + " already exist.");
            }

            // update user properties
            member.name = memberParam.name;
            member.relation = memberParam.relation;

            _context.Members.Update(member);
            _context.SaveChanges();
            return member;
        }
        public void Delete(int memberid)
        {
            var member = _context.Members.Find(memberid);
            if (member != null)
            {
                _context.Members.Remove(member);
                _context.SaveChanges();
            }
            //remove all childrens recursively as well
        }
    }
}