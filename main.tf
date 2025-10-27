terraform {
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.53"
    }
  }
}

provider "openstack" {
  tenant_name = var.tenant_name
  user_name   = var.user_name
  password    = var.password
  auth_url    = var.auth_url
  region      = var.region
}

variable "tenant_name" {}
variable "user_name" {}
variable "password" { sensitive = true }
variable "auth_url"  {}
variable "region"    { default = "RegionOne" }
variable "cidr"      { default = "10.50.0.0/16" }
variable "domain"    { default = "gratech.sa" }

resource "openstack_networking_network_v2" "vpc" {
  name = "gra-vpc"
}

resource "openstack_networking_subnet_v2" "subnet" {
  name            = "gra-subnet"
  network_id      = openstack_networking_network_v2.vpc.id
  cidr            = var.cidr
  ip_version      = 4
  dns_nameservers = ["1.1.1.1"]
}

output "network_id" { value = openstack_networking_network_v2.vpc.id }
output "subnet_id"  { value = openstack_networking_subnet_v2.subnet.id }
output "frontend_url" { value = "https://${var.domain}" }
