"use client"

import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
    title: string;
    value: number;
    description: string;
    icon: keyof typeof Icons;
    trend?: string;
    trendUp?: boolean;
    suffix?: string;
}

export function StatsCard({ title, value, description, icon, trend, trendUp, suffix = "" }: StatsCardProps) {
    const Icon = Icons[icon] as LucideIcon;
    const TrendIcon = trendUp ? Icons.TrendingUp : Icons.TrendingDown;

    return (
        <Card className="overflow-hidden border-none bg-white shadow-lg transition-all duration-200 hover:shadow-xl">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white via-white opacity-90" />
            </div>

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
                <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                    <Icon className="h-5 w-5" />
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex items-baseline">
                    <div className="text-3xl font-bold tracking-tight transition-all duration-300 ease-in-out">
                        {value}
                        <span className="ml-1 text-2xl">{suffix}</span>
                    </div>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">{description}</p>

                {trend && (
                    <div className="mt-4 flex items-center">
                        <div className={`flex items-center text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'
                            }`}>
                            <TrendIcon className="mr-1 h-3 w-3" />
                            <span>{trend}</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
