class UsersController < ApplicationController
	require 'net/http'

	def index
		@users = User.All()
	end

	def new
	end

	def show
		@user = User.find(params[:id])
		@total = 0
		@user["positions"].each do |p|
			@total = @total + Integer(p["value"])
		end
		@user["positions"].each do |p|
			p["percentage"] = (p["value"].to_f / @total).round(2)
		end


	end

	def update
		@user = User.find(params[:deposit][:id])
		deposit_amt = Integer(params[:deposit][:deposit_amt])
		newCash = Integer(@user["cash_invested"]) + deposit_amt
		@user["cash_invested"] = newCash
		@user["positions"].each do |p|
			if p["name"] == "Cash"
				newVal = Integer(p["value"]) + deposit_amt
				p["value"] = newVal
				break
			end
		end
		User.Put(@user)
	end

	def create
		User.Post(params[:user])
	end

	def edit
		@user = User.find(params[:id])

	end

	def destroy
		User.Delete(params[:id])
	end
end
