import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { ConversationParticipant } from '../Schemas/conversation-participant.schema';

@Injectable()
export class ConversationParticipantsRepository extends GenericRepository<ConversationParticipant> {
  constructor(
    @InjectModel(ConversationParticipant.name)
    private _conversationParticipantModel: Model<ConversationParticipant>,
  ) {
    super(_conversationParticipantModel);
  }

  async getUserGroupConversations(userId: string) {
    return await this._conversationParticipantModel
      .aggregate([
        {
          $match: { user: new Types.ObjectId(userId) },
        },
        {
          $lookup: {
            from: 'conversations',
            localField: 'conversation',
            foreignField: '_id',
            as: 'conversationDetails',
          },
        },
        {
          $unwind: '$conversationDetails',
        },
        {
          $match: { 'conversationDetails.type': 'group' },
        },
        {
          $replaceRoot: { newRoot: '$conversationDetails' },
        },
      ])
      .exec();
  }

  async findSingleConversation(currentUserId: string, otherUserId: string) {
    return this._conversationParticipantModel.aggregate([
      {
        $match: {
          user: {
            $in: [
              new Types.ObjectId(currentUserId),
              new Types.ObjectId(otherUserId),
            ],
          },
        },
      },
      {
        $group: {
          _id: '$conversation',
          users: { $addToSet: '$user' },
        },
      },
      {
        $match: {
          users: { $size: 2 },
        },
      },
      {
        $lookup: {
          from: 'conversations',
          localField: '_id',
          foreignField: '_id',
          as: 'conversation',
        },
      },
      {
        $unwind: '$conversation',
      },
      {
        $match: {
          'conversation.type': 'single',
        },
      },
    ]);
  }

  async getConversationWithUserId(userId: string) {
    return this._conversationParticipantModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversation',
        },
      },
      {
        $lookup: {
          from: 'conversationparticipants',
          localField: 'conversation._id',
          foreignField: 'conversation',
          as: 'participants',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'participants.user',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $project: {
          _id: 0,
          'users.fullName': 1,
          'users.email': 1,
          'users._id': 1,
          participantsLength: { $size: '$participants' },
          conversation: 1,
        },
      },
      {
        $set: {
          users: {
            $slice: [
              {
                $filter: {
                  input: '$users',
                  as: 'user',
                  cond: {
                    $ne: ['$$user._id', new mongoose.Types.ObjectId(userId)],
                  },
                },
              },
              1,
            ],
          },
        },
      },
    ]);
  }
}