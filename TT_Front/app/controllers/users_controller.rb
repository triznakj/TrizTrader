class UsersController < ApplicationController
	require 'net/http'

	def index
		@users = User.All()
	end

	def new
	end

	def show
		@user = User.find(params[:id])
		@positions = []
		@total = @user["cash_held"]
		@user["positions"].each do |p|
			puts p
			pos = Position.Find(p)
			@positions.push(pos)
			@total = @total + Integer(pos["value"])
		end

		@positions.each do |p|
			p["percentage"] = (p["value"].to_f / @total).round(2)
		end
		@user["cash_percent"] = (@user["cash_held"].to_f / @total).round(2)


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
		params[:user]["cash_held"] = params[:user]["cash_invested"]
		User.Post(params[:user])
	end

	def edit
		@user = User.find(params[:id])

	end

	def destroy
		User.Delete(params[:id])
	end
end
