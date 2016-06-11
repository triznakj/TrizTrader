class User < ActiveRecord::Base
	require 'net/http'

	def self.All
		uri = URI('http://localhost:3000/user') 
		users = Net::HTTP.get(uri)
		parse = JSON.parse users
		return parse
	end

	def self.Post newUser
		uri = URI('http://localhost:3000/user')
		http = Net::HTTP.new(uri.host, uri.port)
		http.post(uri, newUser.to_json, {"Content-Type" => "application/json", "Accept" => "application/json"})
	end

	def self.Delete id
		uri = URI('http://localhost:3000/user/'+id)
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Delete.new(uri.path)
		res = http.request(req)
	end

	def self.find id
		uri = URI('http://localhost:3000/user/'+id)
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Get.new(uri.path)
		res = http.request(req)
		return JSON.parse(res.body)
	end

	def self.Put newUser
		puts newUser["_id"]
		uri = URI('http://localhost:3000/user/'+newUser["_id"])
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Put.new(uri.path, initheader= {'Content-Type' => 'application/json'})
		res = http.request(req, JSON.generate(newUser))
		puts res.body
	end
end
