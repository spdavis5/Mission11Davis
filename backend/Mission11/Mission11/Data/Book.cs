﻿using System.ComponentModel.DataAnnotations;

namespace Mission11.Data
{
    //Book model
    public class Book
    {
        [Key]
        public int BookID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public string Publisher { get; set; }

        [Required]
        public string ISBN { get; set; }

        [Required]
        public string Classification { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public int PageCount { get; set; }

        [Required]
        public double Price { get; set; }
    }
}
