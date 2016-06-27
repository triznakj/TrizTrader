class Transaction < ActiveRecord::Base
	require 'net/http'

	def self.All
		uri = URI('http://localhost:3000/transaction') 
		transactions = Net::HTTP.get(uri)
		parse = JSON.parse transactions
		return parse
	end

	def self.Post newTransaction
		puts "Hello world"
		puts newTransaction
		uri = URI('http://localhost:3000/transaction')
		http = Net::HTTP.new(uri.host, uri.port)
		http.post(uri, newTransaction, {"Content-Type" => "application/json", "Accept" => "application/json"})
	end

	def self.Delete id
		uri = URI('http://localhost:3000/transaction/'+id)
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Delete.new(uri.path)
		res = http.request(req)
	end

	def self.Find id
		uri = URI('http://localhost:3000/transaction/'+id)
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Get.new(uri.path)
		res = http.request(req)
		return JSON.parse(res.body)
	end

	def self.Put newTransaction
		uri = URI('http://localhost:3000/transaction/'+newTransaction["_id"])
		http = Net::HTTP.new(uri.host, uri.port)
		req = Net::HTTP::Put.new(uri.path, initheader= {'Content-Type' => 'application/json'})
		res = http.request(req, JSON.generate(newTransaction))
	end
end
