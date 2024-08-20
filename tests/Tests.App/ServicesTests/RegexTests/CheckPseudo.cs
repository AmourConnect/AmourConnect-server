﻿using AmourConnect.App.Services;

namespace Tests.App.ServicesTests.RegexTests
{
    public class CheckPseudo
    {
        private static readonly RegexUtils RegexUtils = new();

        [Theory]
        [InlineData("A", true)]
        [InlineData("M", true)]
        [InlineData("AB", true)]
        [InlineData("MFzehbd", true)]
        [InlineData("Fsapeodjsmzpdje", true)]
        [InlineData("Mze@?n", false)]
        [InlineData("Fsapeodjsmzpdjes", false)]
        [InlineData("M#", false)]
        [InlineData(null, false)]
        public void CheckPseudo_ShouldReturnExpectedResult(string pseudo, bool expected)
        {
            bool result = RegexUtils.CheckPseudo(pseudo);

            Assert.Equal(expected, result);
        }
    }
}